// db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  const db = await open({
    filename: "./market_data.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS market_data (
      timestamp TEXT PRIMARY KEY,
      silverNY REAL,
      silverLondon REAL,
      silverSHA REAL,
      silverIND REAL,
      goldNY REAL,
      goldSilverRatio REAL,
      spreadSHA_NY REAL,
      spreadIND_NY REAL
    )
  `);

  return db;
}

export async function insertData(db, data) {
  const stmt = await db.prepare(`
    INSERT INTO market_data (
      timestamp, silverNY, silverLondon, silverSHA, silverIND,
      goldNY, goldSilverRatio, spreadSHA_NY, spreadIND_NY
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  await stmt.run(
    data.timestamp,
    data.silverNY,
    data.silverLondon,
    data.silverSHA,
    data.silverIND,
    data.goldNY,
    data.goldSilverRatio,
    data.spreadSHA_NY,
    data.spreadIND_NY
  );
  await stmt.finalize();
}

export async function getLatest(db) {
  return db.get("SELECT * FROM market_data ORDER BY timestamp DESC LIMIT 1");
}

export async function getHistory(db, limit = 1000) {
  return db.all("SELECT * FROM market_data ORDER BY timestamp ASC LIMIT ?", limit);
}
