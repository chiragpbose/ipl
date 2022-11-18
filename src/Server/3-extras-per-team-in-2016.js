//Extra runs conceded per team in the year 2016
const matches = require("/home/chirag/IPL/src/data/matches.json");
const deliveries = require("/home/chirag/IPL/src/data/deliveries.json");
const fs = require("fs");
function extrasPerTeam() {
	let arrayMatchIDs = [];
	matches.forEach((match) => {
		if (match.season == 2016) {
			arrayMatchIDs.push(match.id);
		}
	});
	let outputObj = {};
	// for (
	//   let indexArrayMatchIDs = 0;
	//   indexArrayMatchIDs < arrayMatchIDs.length;
	//   indexArrayMatchIDs++
	// ) {
	//   for (
	//     let indexDeliveries = 0;
	//     indexDeliveries < deliveries.length;
	//     indexDeliveries++
	//   ) {
	deliveries.forEach((delivery) => {
		if (arrayMatchIDs.includes(delivery["match_id"])) {
			let bowlingTeam = delivery["bowling_team"];
			let extraRuns = parseInt(delivery["e xtra_runs"]);
			if (!outputObj[bowlingTeam]) {
				outputObj[bowlingTeam] = extraRuns;
			} else {
				outputObj[bowlingTeam] += extraRuns;
				// console.log("else");
			}
		}
	});
	console.log(outputObj);
	return JSON.stringify(outputObj, null, 2);
}
fs.writeFile(
	"/home/chirag/IPL/src/public/output/3-output.JSON",
	extrasPerTeam(),
	(err) => {
		console.log("Data saved");
	}
);
