// scrapeChinaFX.js
// Version autonome : toutes les valeurs sont générées localement
// Pas besoin de node-fetch ou internet

export async function scrapeSilverNY() {
  // New York Silver USD/oz
  return 120 + Math.random() * 5; // valeur aléatoire proche de 120
}

export async function scrapeSilverLondon() {
  // London Silver USD/oz
  return 118 + Math.random() * 3;
}

export async function scrapeSilverShanghai() {
  // Shanghai Silver RMB/kg -> converti en USD/oz dans fetchAndStore
  return 30000 + Math.random() * 500;
}

export async function scrapeSilverIndia() {
  // Silver India INR/oz -> converti en USD/oz dans fetchAndStore
  return 1000 + Math.random() * 50;
}

export async function
