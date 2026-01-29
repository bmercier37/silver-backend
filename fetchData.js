// fetchData.js
import { scrapeSilverNY, scrapeSilverLondon, scrapeSilverShanghai, scrapeSilverIndia, scrapeGoldNY } from "./scrapeChinaFX.js";
import { initDB, insertData } from "./db.js";

export async function fetchAndStore() {
  const db = await initDB();

  // Scrape fake data
  const silverNY = await scrapeSilverNY();
  const silverLondon = await scrapeSilverLondon();
  const silverSHA_RMB = await scrapeSilverShanghai();
  const silverIND_INR = await scrapeSilverIndia();
  const goldNY = await scrapeGoldNY();

  // Taux de change fixes pour fake (exemple)
  const RMB_USD = 0.14;
  const INR_USD = 0.012;

  // Conversion
  const silverSHA = silverSHA_RMB * RMB_USD / 31.1035; // kg → oz
  const silverIND = silverIND_INR * INR_USD;

  // Calcul ratios et spreads
  const goldSilverRatio = goldNY / silverNY;
  const spreadSHA_NY = ((silverSHA - silverNY) / silverNY) * 100;
  const spreadIND_NY = ((silverIND - silverNY) / silverNY) * 100;

  const data = {
    timestamp: new Date().toISOString(),
    silverNY,
    silverLondon,
    silverSHA,
    silverIND,
    goldNY,
    goldSilverRatio,
    spreadSHA_NY,
    spreadIND_NY
  };

  await insertData(db, data);

  console.log("Data stored:", data);
  await db.close();
  return data;
}
