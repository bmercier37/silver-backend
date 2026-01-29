import express from "express";
import cors from "cors";
import cron from "node-cron";
import { fetchAndStore } from "./fetchData.js";
import { db } from "./db.js";
import { scrapeSilverNY } from "./scrapeChinaFX.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://bmercier37.github.io"
}));

// ---------- ROUTES API ----------

// latest stored data
app.get("/api/latest", (req, res) => {
  db.get(
    "SELECT * FROM market_data ORDER BY timestamp DESC LIMIT 1",
    (err, row) => res.json(row)
  );
});

// history (10 days)
app.get("/api/history", (req, res) => {
  db.all(
    "SELECT * FROM market_data ORDER BY timestamp ASC",
    (err, rows) => res.json(rows)
  );
});

// 🔍 TEST SCRAPING (TEMPORAIRE)
app.get("/api/test-scrape", async (req, res) => {
  try {
    const price = await scrapeSilverNY();
    res.json({ silverNY: price });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- CRON ----------

// every 15 minutes
cron.schedule("*/15 * * * *", fetchAndStore);

// run once at startup
fetchAndStore();

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
