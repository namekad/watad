import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

// Helper function to get the content file path
const getContentPath = (lang: string) => {
  return path.join(process.cwd(), 'public', 'locales', lang, 'common.json');
};

// Helper to get client IP
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 
         request.headers.get('cf-connecting-ip') || 
         'unknown';
}

// Middleware to check authentication - server-side JWT verification
async function isAuthenticated(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return false;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return false;
    }

    // Verify the token directly on the server
    jwt.verify(token, jwtSecret);
    return true;
  } catch (error) {
    return false;
  }
}

// Helper to validate content structure
function isValidContent(content: any): boolean {
  try {
    // Basic structure validation
    if (!content.pages || typeof content.pages !== 'object') return false;
    if (!content.navigation || typeof content.navigation !== 'object') return false;

    // Required sections validation
    const requiredSections = ['home', 'about', 'services', 'contact'];
    for (const section of requiredSections) {
      if (!content.pages[section]) return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

// Helper to sanitize content
function sanitizeContent(content: any): any {
  try {
    // Deep clone the content
    const sanitized = JSON.parse(JSON.stringify(content));

    // Remove any potentially harmful content or scripts
    const sanitizeValue = (value: any): any => {
      if (typeof value === 'string') {
        // Remove potential script tags and other harmful HTML
        return value
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+=/gi, '');
      }
      return value;
    };

    // Recursively sanitize all string values
    const deepSanitize = (obj: any): any => {
      if (typeof obj !== 'object' || obj === null) {
        return sanitizeValue(obj);
      }

      if (Array.isArray(obj)) {
        return obj.map(item => deepSanitize(item));
      }

      const result: any = {};
      for (const key of Object.keys(obj)) {
        result[key] = deepSanitize(obj[key]);
      }
      return result;
    };

    return deepSanitize(sanitized);
  } catch (error) {
    console.error('Sanitization error:', error);
    throw new Error('Content sanitization failed');
  }
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30;
const requestCounts = new Map<string, { count: number; timestamp: number }>();

// Rate limiting middleware
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requestData = requestCounts.get(ip);

  if (!requestData || (now - requestData.timestamp) > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (requestData.count >= MAX_REQUESTS) {
    return false;
  }

  requestData.count++;
  return true;
}

// GET handler for fetching content
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang');

    if (!lang || !['en', 'ar'].includes(lang)) {
      return NextResponse.json(
        { error: 'Invalid language parameter' },
        { status: 400 }
      );
    }

    const filePath = getContentPath(lang);
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    );
  }
}

// POST handler for saving content
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const isAuthed = await isAuthenticated(request);
    if (!isAuthed) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    const { lang, content } = await request.json();

    if (!lang || !['en', 'ar'].includes(lang)) {
      return NextResponse.json(
        { error: 'Invalid language parameter' },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content' },
        { status: 400 }
      );
    }

    // Validate content structure
    if (!isValidContent(content)) {
      return NextResponse.json(
        { error: 'Invalid content structure' },
        { status: 400 }
      );
    }

    // Sanitize content
    const sanitizedContent = sanitizeContent(content);

    // Create backup before saving
    const filePath = getContentPath(lang);
    const backupPath = `${filePath}.backup-${Date.now()}`;
    await fs.copyFile(filePath, backupPath);

    try {
      await fs.writeFile(filePath, JSON.stringify(sanitizedContent, null, 2), 'utf-8');
    } catch (writeError) {
      // Restore from backup if write fails
      await fs.copyFile(backupPath, filePath);
      throw writeError;
    } finally {
      // Clean up backup after successful write
      await fs.unlink(backupPath).catch(console.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
} 