//Number of matches played per year for all the years in IPL.
const data = require("/home/chirag/IPL/src/data/matches.json");
const fs = require("fs");
let outputObj = {};
function matchesPerYear() {
  data.forEach((element) => {
    if (outputObj[element.season]) {
      outputObj[element.season]++;
    } else {
      outputObj[element.season] = 1;
    }
  });
  return JSON.stringify(outputObj, null, 2);
}

fs.writeFile(
  "/home/chirag/IPL/src/public/output/1-output.JSON",
  matchesPerYear(),
  (err) => console.log("Data saved")
);
