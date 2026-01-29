import { scrapeSilverNY } from "./scrapeChinaFX.js";

export async function fetchAndStore() {
  try {
    // REAL
    const silverNY = await scrapeSilverNY();

    // STILL FAKE (pour l’instant)
    const silverLondon = silverNY + Math.random();
    const silverSHA = silverNY + 1 + Math.random();
    const silverIND = silverNY + 1.5 + Math.random();
    const goldNY = 2000 + Math.random() * 20;

    const goldSilverRatio = goldNY / silverNY;
    const spreadSHA = ((silverSHA - silverNY) / silverNY) * 100;
    const spreadIND = ((silverIND - silverNY) / silverNY) * 100;

    db.run(
      `
      INSERT INTO market_data
      (silver_ny, silver_london, silver_sha, silver_ind,
       gold_silver_ratio, spread_sha_ny, spread_ind_ny)
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

    db.run(`
      DELETE FROM market_data
      WHERE timestamp < datetime('now', '-10 days')
    `);

    console.log("Data updated (Silver NY real)");
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}
