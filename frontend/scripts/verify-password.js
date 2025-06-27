const bcrypt = require("bcryptjs");

// The hash from your .env.local file
const storedHash =
  "$2b$12$nc8OYJoXXIhe/qnKaMET6.tT9j.l5ybMf4WqaU1HWP.itY.6ocmRy";

// Test different passwords
const testPasswords = ["admin123", "admin", "password123"];

async function verifyPasswords() {
  console.log("Testing password verification...\n");

  for (const password of testPasswords) {
    const isMatch = await bcrypt.compare(password, storedHash);
    console.log(
      `Password "${password}": ${isMatch ? "MATCHES ✅" : "Does NOT match ❌"}`
    );
  }

  // Generate a new hash for 'admin123' to compare
  const newHash = await bcrypt.hash("admin123", 12);
  console.log('\nNew hash for "admin123":', newHash);
}

async function generateAndVerify() {
  const password = "admin123";

  // Generate a new hash
  const newHash = await bcrypt.hash(password, 12);
  console.log("\nNew hash generated:");
  console.log(newHash);

  // Verify the new hash works
  const isValid = await bcrypt.compare(password, newHash);
  console.log("\nVerifying new hash works:", isValid ? "✅ YES" : "❌ NO");

  // Current hash from .env.local
  const currentHash =
    "$2b$12$nc8OYJoXXIhe/qnKaMET6.tT9j.l5ybMf4WqaU1HWP.itY.6ocmRy";
  const currentValid = await bcrypt.compare(password, currentHash);
  console.log(
    "\nVerifying current .env.local hash works:",
    currentValid ? "✅ YES" : "❌ NO"
  );

  console.log("\n=== Instructions ===");
  console.log(
    "1. Replace the ADMIN_PASSWORD_HASH in .env.local with this new hash:"
  );
  console.log(newHash);
}

verifyPasswords();
generateAndVerify();
