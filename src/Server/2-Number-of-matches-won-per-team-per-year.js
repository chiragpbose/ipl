//Number of matches won per team per year in IPL.
const data = require("/home/chirag/IPL/src/data/matches.json");
const fs = require("fs");
let outputObj = {};
function matchesWonPerTeamPerYear() {
	data.forEach((match) => {
		let team = match.winner;
		let year = match.season;
		if (!outputObj[team]) {
			outputObj[team] = {};
			outputObj[team][year] = 1;
		}
		if (!outputObj[team][year]) {
			outputObj[team][year] = 1;
		} else {
			outputObj[team][year]++;
		}
	});

	return JSON.stringify(outputObj, null, 2);
}

fs.writeFile(
	"/home/chirag/IPL/src/public/output/2-output.JSON",
	matchesWonPerTeamPerYear(),
	(err) => console.log("Data saved")
);
