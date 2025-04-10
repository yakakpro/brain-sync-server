
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

function getFilePath(req) {
  const id = req.query.id || "default";
  return `./brains/${id}.json`;
}

app.get("/api/load-brain", (req, res) => {
  const file = getFilePath(req);
  try {
    const data = fs.readFileSync(file, "utf-8");
    res.json(JSON.parse(data));
  } catch {
    res.json({});
  }
});

app.post("/api/save-brain", (req, res) => {
  const file = getFilePath(req);
  try {
    fs.mkdirSync("./brains", { recursive: true });
    fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
    res.json({ status: "ok" });
  } catch {
    res.status(500).json({ error: "failed to save" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/observer", (req, res) => {
  res.sendFile(path.join(__dirname, "observer.html"));
});

app.get("/join", (req, res) => {
  res.sendFile(path.join(__dirname, "join.html"));
});

app.listen(PORT, () => {
  console.log(`🧠 oQs multi-user server running on port ${PORT}`);
});

app.get("/visual", (req, res) => {
  res.sendFile(path.join(__dirname, "visual.html"));
});

