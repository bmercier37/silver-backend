// index.js
import express from "express";
import cors from "cors";
import cron from "node-cron";
import { fetchAndStore } from "./fetchData.js";
import { initDB, getLatest, getHistory } from "./db.js";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Routes API
app.get("/api/latest", async (req, res) => {
  const db = await initDB();
  const data = await getLatest(db);
  await db.close();
  res.json(data || { error: "No data yet" });
});

app.get("/api/history", async (req, res) => {
  const db = await initDB();
  const data = await getHistory(db, 1000);
  await db.close();
  res.json(data);
});

app.get("/api/test-scrape", async (req, res) => {
  try {
    const data = await fetchAndStore();
    res.json(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Cron toutes les 15 minutes
cron.schedule("*/15 * * * *", async () => {
  console.log("Cron triggered:", new Date().toISOString());
  await fetchAndStore();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
