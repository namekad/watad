const bcrypt = require("bcryptjs");

async function encodeHash() {
  // The original hash that works
  const originalHash =
    "$2b$10$TKXdri/qzGJ4LJde2e/05.r2aGo1.TukXDamRtcLl13VEh4xX.5PC";

  // Encode it in Base64
  const encodedHash = Buffer.from(originalHash).toString("base64");

  console.log("Original hash:", originalHash);
  console.log("Encoded hash (Base64):", encodedHash);

  // Test decoding
  const decodedHash = Buffer.from(encodedHash, "base64").toString("utf8");
  console.log("Decoded hash:", decodedHash);
  console.log("Decoding works:", originalHash === decodedHash);

  // Test password verification with decoded hash
  const isValid = await bcrypt.compare("admin123", decodedHash);
  console.log("Password verification works:", isValid);

  console.log("\n=== Update your .env.local ===");
  console.log("Replace ADMIN_PASSWORD_HASH with:");
  console.log("ADMIN_PASSWORD_HASH_B64=" + encodedHash);
}

encodeHash();
