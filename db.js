import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./data.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS market_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      silver_ny REAL,
      silver_london REAL,
      silver_sha REAL,
      silver_ind REAL,
      gold_silver_ratio REAL,
      spread_sha_ny REAL,
      spread_ind_ny REAL
    )
  `);
});
