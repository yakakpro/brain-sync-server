const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

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
  console.log(`🧠 noosync сервер работает на порту ${PORT}`);
});
