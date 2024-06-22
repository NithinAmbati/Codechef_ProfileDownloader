const express = require("express");
const cors = require("cors");
const getCoursesData = require(".");

const app = express();
app.use(cors());

app.get("/courses", async (req, res) => {
  try {
    const data = await getCoursesData();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
