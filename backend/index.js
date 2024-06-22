const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
app.listen(8000, () => {
  console.log("Server running on port no: 8000...");
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running..." });
});

app.post("/codechef", async (req, res) => {
  const { username } = req.body;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.codechef.com/users/${username}`);
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    browser.close();

    const screenshotBase64 = screenshotBuffer.toString("base64");
    res.status(200).json({ image: screenshotBase64 });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});
