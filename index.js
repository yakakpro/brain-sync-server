import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;
const FILE = "./db.json";

app.use(cors());
app.use(express.json());

app.get("/api/load-brain", (req, res) => {
  try {
    const data = fs.readFileSync(FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch {
    res.json({});
  }
});

app.post("/api/save-brain", (req, res) => {
  try {
    fs.writeFileSync(FILE, JSON.stringify(req.body, null, 2));
    res.json({ status: "ok" });
  } catch {
    res.status(500).json({ error: "failed to save" });
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Brain sync server running on http://localhost:${PORT}`);
});

