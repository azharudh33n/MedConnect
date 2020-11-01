const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvwriter = createCsvWriter({
  path: "dataSet.csv",
  header: [
    {
      id: "disease",
      title: "DISEASE",
    },
    {
      id: "symptoms",
      title: "SYMPTOMS",
      
    },
  ],
  append: true,
  // fieldDelimiter: ";"
});

async function mainSelect(page, disease) {
  console.log("Searching Initiated");
  await page.waitForSelector(
    "div.gsc-result:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)"
  );
  await page.click(
    "div.gsc-result:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)"
  );

  // await page.waitForSelector(
  //   "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(3) > ul:nth-child(5)"
  // );

  if (disease === "cough" || disease === "fever") {
    await page.waitForSelector(
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(3) > ul:nth-child(5)"
    );
    const selector =
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(3) > ul:nth-child(5)";
    scrapeData(page, disease, selector);
  } else if (disease === "stomach ache") {
    await page.waitForSelector(
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(2) > ul:nth-child(7)"
    );
    const selector =
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(2) > ul:nth-child(7)";
    scrapeData(page, disease, selector);
  } else if (disease === "pneumonia") {
    await page.waitForSelector(
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(3) > ul:nth-child(4)"
    );
    const selector =
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(3) > ul:nth-child(4)";
    scrapeData(page, disease, selector);
  } else if (disease === "Diarrhea") {
    await page.waitForSelector(
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(2) > ul"
    );
    const selector =
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(2) > ul";
    scrapeData(page, disease, selector);
  } else if (disease === "Headaches") {
    await page.waitForSelector(
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div.css-2h0l1x > ul:nth-child(9)"
    );
    const selector =
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div.css-2h0l1x > ul:nth-child(9)";
    scrapeData(page, disease, selector);
  } else if (disease === "cancer") {
    await page.waitForSelector(
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(6) > ul:nth-child(4)"
    );
    const selector =
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(6) > ul:nth-child(4)";
    scrapeData(page, disease, selector);
  }
}

async function scrapeData(page, disease, selector) {
  console.log(selector);
  const cselect = selector;
  const Data = await page.evaluate((cselect) => {
    const list = document.querySelector(cselect);

    const ListValue = Array.from(list.childNodes); //Converting NodeList to Array

    return ListValue.map((item) => {
      return item.innerText;
    });
  }, cselect);
  console.log(Data);

  const records = [
    {
      disease: disease,
      symptoms: Data,
    },
  ];
  csvwriter
    .writeRecords(records) // returns a promise
    .then(() => {
      console.log("...Done");
    });
}

module.exports.mainSelect = mainSelect;
module.exports.scrapeData = scrapeData;
