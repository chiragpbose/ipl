//Find a player who has won the highest number of
//Player of the Match awards for each season

const matches = require("/home/chirag/IPL/src/data/matches.json");
const deliveries = require("/home/chirag/IPL/src/data/deliveries.json");
const fs = require("fs");

function potm() {
	let objectOfAllPOTMsPerSeason = {};
	matches.forEach((obj) => {
		let season = obj.season;
		let playerOfTheMatch = obj.player_of_match;
		if (!objectOfAllPOTMsPerSeason[season]) {
			objectOfAllPOTMsPerSeason[season] = {};
			objectOfAllPOTMsPerSeason[season][playerOfTheMatch] = 1;
		} else {
			if (!objectOfAllPOTMsPerSeason[season][playerOfTheMatch]) {
				objectOfAllPOTMsPerSeason[season][playerOfTheMatch] = 1;
			} else {
				objectOfAllPOTMsPerSeason[season][playerOfTheMatch] += 1;
			}
		}
	});
	//console.log(objectOfAllPOTMsPerSeason);
	let outputObj = {};
	for (let season in objectOfAllPOTMsPerSeason) {
		let workingArray = Object.entries(objectOfAllPOTMsPerSeason[season]);
		workingArray.sort((a, b) => b[1] - a[1]);
		outputObj[season] = workingArray[0][0];
	}
	console.log(outputObj);
	return JSON.stringify(outputObj, null, 1);
}
fs.writeFile(
	"/home/chirag/IPL/src/public/output/6-output.JSON",
	potm(),
	(err) => console.log("data saved")
);
