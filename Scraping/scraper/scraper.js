const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvwriter = createCsvWriter({
  path: "Dataset.csv",
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
  append: true
  // fieldDelimiter: ";"
});

async function mainSelect(page) {
  console.log("Searching Initiated");
  await page.waitForSelector(
    "div.gsc-result:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)"
  );
  await page.click(
    "div.gsc-result:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)"
  );

  await page.waitForSelector(
    "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(3) > ul:nth-child(5)"
  );
}

async function scrapeData(page, disease) {
  const Data = await page.evaluate(() => {
    const list = document.querySelector(
      "#__next > div.css-stl7tm > div > div > div:nth-child(3) > article > div:nth-child(3) > ul:nth-child(5)"
    );

    const ListValue = Array.from(list.childNodes); //Converting NodeList to Array

    return ListValue.map((item) => {
      return item.innerText;
    });

    // return ListValue;
  });
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
