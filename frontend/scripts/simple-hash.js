const bcrypt = require("bcryptjs");
const crypto = require("crypto");

async function createSimpleAuth() {
  // Instead of using bcrypt hash in env, let's hardcode the password check
  // This is a temporary solution to bypass the env variable parsing issue

  const password = "admin123";
  const hash = await bcrypt.hash(password, 10);

  console.log("Generated hash:", hash);
  console.log("Hash length:", hash.length);

  // Test verification
  const isValid = await bcrypt.compare(password, hash);
  console.log("Verification works:", isValid);

  // Alternative approach: Use a simple secret key instead of bcrypt
  const simpleSecret = crypto
    .createHash("sha256")
    .update("admin123")
    .digest("hex");
  console.log("\nAlternative simple secret:", simpleSecret);

  console.log("\n=== Recommendation ===");
  console.log(
    "Due to Next.js environment variable parsing issues with $ characters,"
  );
  console.log("consider using a simple SHA256 hash instead of bcrypt for now:");
  console.log("ADMIN_PASSWORD_SECRET=" + simpleSecret);
}

createSimpleAuth();
