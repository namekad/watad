const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const fs = require("fs");

async function setupProduction() {
  console.log("🔧 Setting up production environment...\n");

  // Generate secure values
  const jwtSecret = crypto.randomBytes(64).toString("hex");
  const adminPassword = crypto.randomBytes(16).toString("hex"); // Random password
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  // Escape dollar signs for Next.js environment variables
  const escapedHash = passwordHash.replace(/\$/g, "$$");

  // Production environment content
  const productionEnv = `# Production Environment Variables
# Generated on ${new Date().toISOString()}
# KEEP THIS FILE SECURE AND NEVER COMMIT TO VERSION CONTROL

# Authentication
JWT_SECRET=${jwtSecret}
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD_HASH=${escapedHash}

# API Configuration
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000

# Content Settings
CONTENT_BACKUP_ENABLED=true
TOKEN_EXPIRY=1800
NODE_ENV=production
`;

  // Write to .env.production.local
  fs.writeFileSync(".env.production.local", productionEnv);

  console.log("✅ Production environment file created: .env.production.local");
  console.log("\n🔐 IMPORTANT - Save these credentials securely:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Email: admin@yourcompany.com`);
  console.log(`Password: ${adminPassword}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  console.log("📋 Production Checklist:");
  console.log("□ Change ADMIN_EMAIL to your actual admin email");
  console.log("□ Save the generated password in a secure password manager");
  console.log("□ Never commit .env.production.local to version control");
  console.log("□ Use environment variables in your hosting platform");
  console.log("□ Enable HTTPS in production");
  console.log("□ Set up proper CORS origins");
  console.log("□ Configure rate limiting appropriately");
  console.log("□ Set up monitoring and logging");
}

setupProduction().catch(console.error);
