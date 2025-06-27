# Bilingual Content Management System

A secure, production-ready content management system for managing bilingual (English/Arabic) website content. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 1. Authentication System

- Secure JWT-based authentication
- Protected admin routes
- Automatic session management
- Secure token storage and verification
- Automatic redirection to login for unauthorized access

### 2. Content Management

- Real-time bilingual content editing
- Side-by-side English and Arabic content management
- Section-based content organization:
  - Home
  - About
  - Services
  - Contact
- Automatic content validation and sanitization
- Content backup system
- Error recovery mechanisms

### 3. Security Features

#### API Security

- Protected API endpoints with JWT authentication
- Rate limiting (30 requests per minute)
- Input validation and sanitization
- XSS protection
- Content structure validation
- Error handling and logging
- Proper HTTP status codes
- Content-Type validation

#### Data Protection

- Automatic content backups before modifications
- Rollback capability on save failures
- Input sanitization
- Content structure validation
- Secure file handling

### 4. User Interface

- Clean, modern admin dashboard
- Responsive design
- Real-time content preview
- Loading states and progress indicators
- Error notifications
- Success confirmations
- Easy navigation between sections

## Technical Architecture

### Frontend Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── (locales)/
│   │   │   └── [lang]/
│   │   │       ├── admin/
│   │   │       │   ├── dashboard/
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── login/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── layout.tsx
│   │   │       └── layout.tsx
│   │   └── api/
│   │       ├── auth/
│   │       │   └── verify/
│   │       │       └── route.ts
│   │       └── content/
│   │           └── route.ts
│   ├── services/
│   │   └── auth.ts
│   └── components/
└── public/
    └── locales/
        ├── en/
        │   └── common.json
        └── ar/
            └── common.json
```

### API Routes

#### Content Management

```typescript
GET /api/content?lang=[en|ar]
POST /api/content
```

#### Authentication

```typescript
POST / api / auth / login;
POST / api / auth / verify;
```

## Security Implementation

### Authentication Flow

1. User attempts to access admin dashboard
2. System checks for valid JWT token
3. If token is invalid/missing, redirect to login
4. On successful login, token is stored securely
5. Token is verified on each protected request

### Content Protection

1. Content validation before saving
2. Automatic backup creation
3. Rollback on save failures
4. Input sanitization for XSS prevention
5. Rate limiting to prevent abuse

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Next.js 14

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
cd frontend
npm install
```

3. Set up environment variables:

```env
JWT_SECRET=your-secret-key
```

4. Run the development server:

```bash
npm run dev
```

### Default Admin Credentials

```
Email: admin@example.com
Password: admin123
```

## Content Structure

### Locales

Content is stored in JSON files:

- English: `/public/locales/en/common.json`
- Arabic: `/public/locales/ar/common.json`

### Content Sections

1. **Home**

   - Hero section
   - Main content
   - Call to action

2. **About**

   - Company information
   - Mission
   - Vision

3. **Services**

   - Service listings
   - Descriptions
   - Features

4. **Contact**
   - Contact information
   - Address
   - Phone numbers
   - Email addresses

## Production Considerations

### Security Checklist

- [x] JWT Authentication
- [x] Rate Limiting
- [x] Input Sanitization
- [x] XSS Protection
- [x] Content Backups
- [x] Error Handling
- [x] Token Verification
- [x] Protected Routes

### Recommended Additional Setup

1. Set up proper CORS configuration
2. Implement CSRF protection
3. Configure secure headers
4. Set up logging and monitoring
5. Implement automated backups
6. Add content versioning
7. Set up analytics

## Error Handling

The system implements comprehensive error handling:

- API errors with proper status codes
- User-friendly error messages
- Automatic error recovery
- Logging for debugging
- Backup and rollback mechanisms

## Performance Optimization

- Caching headers for content
- Parallel content loading
- Optimized state management
- Efficient content updates
- Responsive UI design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact [support-email]

## Authors

- [Your Name/Team]

## Acknowledgments

- Next.js team for the framework
- Tailwind CSS for styling
- JWT for authentication
- Community packages and tools
