const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
app.listen(8000, () => {
  console.log("Server running on port no: 8000...");
});

app.use(express.json());
app.use(cors());

app.post("/codechef", async (req, res) => {
  const { username } = req.body;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.codechef.com/users/${username}`);
    await page.screenshot({
      path: "../frontend/src/example.png",
      fullPage: true,
    });
    browser.close();
    res.status(200).send("Done");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});
