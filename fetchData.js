import axios from "axios";
import { db } from "./db.js";

export async function fetchAndStore() {
  try {
    // MOCK DATA (à remplacer par vraies sources plus tard)
    const silverNY = 25 + Math.random();
    const silverLondon = 25.1 + Math.random();
    const silverSHA = 26 + Math.random();
    const silverIND = 26.5 + Math.random();
    const goldNY = 2000 + Math.random() * 20;

    const goldSilverRatio = goldNY / silverNY;
    const spreadSHA = ((silverSHA - silverNY) / silverNY) * 100;
    const spreadIND = ((silverIND - silverNY) / silverNY) * 100;

    db.run(
      `
      INSERT INTO market_data
      (silver_ny, silver_london, silver_sha, silver_ind, gold_silver_ratio, spread_sha_ny, spread_ind_ny)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        silverNY,
        silverLondon,
        silverSHA,
        silverIND,
        goldSilverRatio,
        spreadSHA,
        spreadIND
      ]
    );

    // purge > 10 jours
    db.run(`
      DELETE FROM market_data
      WHERE timestamp < datetime('now', '-10 days')
    `);

    console.log("Data updated");
  } catch (err) {
    console.error(err);
  }
}
