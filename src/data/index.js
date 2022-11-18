const CSVtoJSON = require("csvtojson");
const fs = require("fs");

function convertToJson() {
  CSVtoJSON()
    .fromFile("./deliveries.csv")
    .then((deliveriesObj) => {
      CSVtoJSON()
        .fromFile("./matches.csv")
        .then((matchesObj) => {
          fs.writeFile(
            "./deliveries.json",
            JSON.stringify(deliveriesObj),
            (error) => {
              console.log(error);
            }
          );
          fs.writeFile(
            "./matches.json",
            JSON.stringify(matchesObj),
            (error) => {
              console.log(error);
            }
          );
        });
    });
}

convertToJson();
