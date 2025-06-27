const bcrypt = require("bcryptjs");

async function generateHash() {
  // Use a lower salt round (10) to generate a simpler hash
  const hash = await bcrypt.hash("admin123", 10);

  console.log("\nGenerated hash for admin123:");
  console.log(hash);

  // Test the hash
  const isValid = await bcrypt.compare("admin123", hash);
  console.log("\nVerifying hash works:", isValid ? "✅ YES" : "❌ NO");

  console.log("\n=== Copy this into your .env.local file ===");
  console.log("ADMIN_PASSWORD_HASH=" + hash);
}

generateHash();
