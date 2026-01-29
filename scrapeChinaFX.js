import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function scrapeSilverNY() {
  try {
    const response = await fetch("https://www.chinafxtools.com/silver/");
    const html = await response.text();

    const $ = cheerio.load(html);
    const silverNYText = $(".col-md-4:contains('New York International Silver') .current-price .price").text();

    if (!silverNYText) {
      throw new Error("Silver NY price not found");
    }

    return parseFloat(silverNYText);
  } catch (err) {
    console.error("Scraping failed:", err.message);
    throw err;
  }
}
