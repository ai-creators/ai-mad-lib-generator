import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage();
const base = "http://localhost:3000";
const shots = "C:/Users/adyla/AppData/Local/Temp/claude/E--Repos-ai-creators-ai-mad-lib-generator/c285614d-a4dd-4c28-8d01-418c81bdf05c/scratchpad";

await page.goto(`${base}/browse`);
await page.waitForLoadState("networkidle");
await page.screenshot({ path: `${shots}/bs-01-browse.png` });

const input = page.locator('input[placeholder="search adlibs..."]');
await input.fill("trolls");
await page.screenshot({ path: `${shots}/bs-02-browse-filled.png` });

await browser.close();
console.log("DONE");
