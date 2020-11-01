const puppeteer = require("puppeteer");
const { mainSelect, scrapeData } = require("./scraper/scraper");


const disease = "fever";
const URL = `https://www.healthline.com/search?q1=${disease}`;

async function browserInit() {
  const browser = await puppeteer.launch(
    {
      headless: false,
      defaultViewport: null,
    },
    () => {
      console.log("Browser Loading Initiated");
    }
  );

  const page = await browser.newPage();
  await page.goto(URL);
  await mainSelect(page);
}

browserInit();
