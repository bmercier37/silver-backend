import { db } from "./db.js";
import { 
  scrapeSilverNY, 
  scrapeSilverLondon, 
  scrapeSilverShanghai, 
  scrapeSilverIndia, 
  scrapeGoldNY 
} from "./scrapeChinaFX.js";

// CONVERT RMB/kg et INR/oz en USD/oz
const RMB_TO_USD = 0.14;  // à ajuster via vrai taux si disponible
const INR_TO_USD = 0.012; // idem

export async function fetchAndStore() {
  try {
    const silverNY = await scrapeSilverNY();
    const silverLondon = await scrapeSilverLondon();
    const silverSHA = await scrapeSilverShanghai() * RMB_TO_USD; // USD/oz approx
    const silverIND = await scrapeSilverIndia() * INR_TO_USD;
    const goldNY = await scrapeGoldNY();

    if (!silverNY || !silverLondon || !silverSHA || !silverIND || !goldNY) {
      console.log("One of the scraped values is null, skipping store");
      return;
    }

    // Ratios et spreads
    const goldSilverRatio = goldNY / silverNY;
    const spreadSHA_NY = ((silverSHA - silverNY) / silverNY) * 100; // %
    const spreadIND_NY = ((silverIND - silverNY) / silverNY) * 100; // %

    const timestamp = new Date().toISOString();

    // Stocker dans SQLite
    db.run(
      `INSERT INTO market_data 
      (timestamp, silverNY, silverLondon, silverSHA, silverIND, goldNY, goldSilverRatio, spreadSHA_NY, spreadIND_NY)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [timestamp, silverNY, silverLondon, silverSHA, silverIND, goldNY, goldSilverRatio, spreadSHA_NY, spreadIND_NY]
    );

    console.log("Data updated at", timestamp);
  } catch (err) {
    console.error("fetchAndStore error:", err.message);
  }
}
