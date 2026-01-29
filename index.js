import { scrapeSilverNY } from "./scrapeChinaFX.js";

app.get("/api/test-scrape", async (req, res) => {
  try {
    const price = await scrapeSilverNY();
    res.json({ silverNY: price });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
