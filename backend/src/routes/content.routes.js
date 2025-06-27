const express = require("express");
const fs = require("fs");
const path = require("path");
const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

// GET content by language
router.get("/:lang", (req, res) => {
  const { lang } = req.params;
  const filePath = path.join(__dirname, `../data/content.${lang}.json`);
  if (!fs.existsSync(filePath))
    return res.status(404).json({ error: "File not found" });

  const data = fs.readFileSync(filePath, "utf-8");
  res.json(JSON.parse(data));
});

// UPDATE content (admin only)
router.post("/:lang", verifyToken, (req, res) => {
  const { lang } = req.params;
  const filePath = path.join(__dirname, `../data/content.${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

module.exports = router;
