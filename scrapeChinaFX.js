// scrapeChinaFX.js
// Version autonome : toutes les valeurs sont générées localement
// Pas besoin de node-fetch ou internet

export async function scrapeSilverNY() {
  return 120 + Math.random() * 5;
}

export async function scrapeSilverLondon() {
  return 118 + Math.random() * 3;
}

export async function scrapeSilverShanghai() {
  return 30000 + Math.random() * 500; // RMB/kg
}

export async function scrapeSilverIndia() {
  return 1000 + Math.random() * 50; // INR/oz
}

export async function scrapeGoldNY() {
  return 2000 + Math.random() * 20;
}
