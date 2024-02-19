const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs/promises");

app.use(express.json());
app.use(cors());

app.post("/api/addUser", async (req, res) => {
  const existingData = await recupData("./db.json");
  const newData = req.body;
  existingData.push(newData);
  const jsonNewData = JSON.stringify(existingData, null, 2);
  await fs.writeFile("./db.json", jsonNewData);
  res.status(201).send("données reçue ");
});

async function recupData(chemin) {
  const jsonData = await fs.readFile(chemin, "utf-8");
  if (jsonData == "") {
    return [];
  }
  const data = JSON.parse(jsonData);
  return data;
}

const PORT = 5001;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
