const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VastraGen API Running");
});

app.get("/api/designs", (req, res) => {
  console.log("📥 GET /api/designs request received");
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "designs.json"), "utf8"));
    console.log(`✅ Successfully loaded ${data.length} designs`);
    res.json(data);
  } catch (err) {
    console.error("❌ Failed to read designs data:", err);
    res.status(500).json({ error: "Failed to read designs data" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
