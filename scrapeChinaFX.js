import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeSilverNY() {
  const url = "https://www.chinafxtools.com/silver/";

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(response.data);

  /*
    ⚠️ Le sélecteur peut changer si le site change.
    Celui-ci fonctionne actuellement pour Silver NY.
  */
  const text = $("tr:contains('New York') td").eq(1).text();

  const price = parseFloat(text.replace(/[^0-9.]/g, ""));

  if (isNaN(price)) {
    throw new Error("Silver NY price not found");
  }

  return price;
}
