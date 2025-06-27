const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Generate secure values
const jwtSecret = crypto.randomBytes(32).toString("hex");
const adminPassword = "admin123"; // Change this in production
const passwordHash = bcrypt.hashSync(adminPassword, 12);

// Generate frontend (.env.local) content
const frontendEnv = `# Authentication
JWT_SECRET=${jwtSecret}
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=${passwordHash}

# API Configuration
RATE_LIMIT_MAX_REQUESTS=30
RATE_LIMIT_WINDOW_MS=60000

# Content Settings
CONTENT_BACKUP_ENABLED=true
TOKEN_EXPIRY=3600 # 1 hour in seconds
`;

// Generate backend (.env) content
const backendEnv = `# Server Configuration
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=${jwtSecret}
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=${passwordHash}

# Security
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=30
`;

// Output the environment variables
console.log("\n=== Frontend Environment Variables (.env.local) ===\n");
console.log(frontendEnv);
console.log("\n=== Backend Environment Variables (.env) ===\n");
console.log(backendEnv);

// Instructions
console.log("\n=== Instructions ===");
console.log("1. Create a file named .env.local in the frontend directory");
console.log("2. Create a file named .env in the backend directory");
console.log("3. Copy the respective content into each file");
console.log(
  "4. Keep these files secure and never commit them to version control"
);
console.log("\nDefault admin credentials:");
console.log(`Email: admin@example.com`);
console.log(`Password: ${adminPassword}`);
