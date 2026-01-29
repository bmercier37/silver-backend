import express from "express";
import cron from "node-cron";
import { fetchAndStore } from "./fetchData.js";
import { db } from "./db.js";

import cors from "cors";

const app = express();

app.use(cors({
  origin: "https://bmercier37.github.io"
}));

const PORT = process.env.PORT || 3000;

// API latest
app.get("/api/latest", (req, res) => {
  db.get(
    "SELECT * FROM market_data ORDER BY timestamp DESC LIMIT 1",
    (err, row) => res.json(row)
  );
});

// API history
app.get("/api/history", (req, res) => {
  db.all(
    "SELECT * FROM market_data ORDER BY timestamp ASC",
    (err, rows) => res.json(rows)
  );
});

// cron every 15 min
cron.schedule("*/15 * * * *", fetchAndStore);

// first run
fetchAndStore();

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

