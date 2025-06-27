import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Function to get the bcrypt hash from Base64 encoded environment variable
function getPasswordHash(): string {
  const encodedHash = process.env.ADMIN_PASSWORD_HASH_B64;
  
  if (!encodedHash) {
    throw new Error('ADMIN_PASSWORD_HASH_B64 not found in environment variables');
  }
  
  // Decode from Base64
  const decodedHash = Buffer.from(encodedHash, 'base64').toString('utf8');
  return decodedHash;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Email check
    if (email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Password check
    try {
      const passwordHash = getPasswordHash();
      const isValidPassword = await bcrypt.compare(password, passwordHash);
      
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('Password validation error:', error);
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Get token expiry from environment or use default
    const tokenExpiry = process.env.TOKEN_EXPIRY ? parseInt(process.env.TOKEN_EXPIRY, 10) : 3600;

    const token = jwt.sign(
      { 
        email: process.env.ADMIN_EMAIL,
        role: 'admin'
      },
      jwtSecret,
      { 
        expiresIn: tokenExpiry
      }
    );

    // Return success
    return NextResponse.json({ 
      token,
      user: {
        email: process.env.ADMIN_EMAIL,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 