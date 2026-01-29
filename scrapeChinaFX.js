import fetch from "node-fetch";
import * as cheerio from "cheerio";

// SCRAPER NY
export async function scrapeSilverNY() {
  try {
    const response = await fetch("https://www.chinafxtools.com/silver/");
    const html = await response.text();
    const $ = cheerio.load(html);

    // Sélecteur plus robuste
    const silverNYText = $("div.silver-price-box:has(h4:contains('New York International Silver')) .current-price .price")
      .first()
      .text()
      .trim();

    if (!silverNYText) {
      throw new Error("Silver NY price not found");
    }

    return parseFloat(silverNYText);
  } catch (err) {
    console.error("Scraping NY failed:", err.message);
    return null; // on renvoie null pour ne pas planter le cron
  }
}

// PLACEHOLDER pour les autres (on met des valeurs fake pour tester le flux)
export async function scrapeSilverLondon() {
  return 119.12 + Math.random(); // fake
}

export async function scrapeSilverShanghai() {
  return 30250 + Math.random(); // fake, RMB/kg
}

export async function scrapeSilverIndia() {
  return 1000 + Math.random(); // fake INR/oz
}

export async function scrapeGoldNY() {
  return 2000 + Math.random() * 20; // fake USD/oz
}
