//Find the number of times each team won the toss and also won the match
const matches = require("/home/chirag/IPL/src/data/matches.json");
const deliveries = require("/home/chirag/IPL/src/data/deliveries.json");
const fs = require("fs");
function tossAndMatch() {
  let outputObj = {};
  matches.forEach((obj) => {
    if (obj.toss_winner === obj.winner) {
      let winner = obj.toss_winner;
      if (!outputObj[winner]) {
        outputObj[winner] = 1;
      } else {
        outputObj[winner]++;
      }
    }
  });
  return JSON.stringify(outputObj, null, 2);
}

fs.writeFile(
  "/home/chirag/IPL/src/public/output/5-output.JSON",
  tossAndMatch(),
  (err) => console.log("Data saved")
);
