//Top 10 economical bowlers in the year 2015
const matches = require("/home/chirag/IPL/src/data/matches.json");
const deliveries = require("/home/chirag/IPL/src/data/deliveries.json");
const fs = require("fs");

function economicalBowlers() {
	let arrayMatchIDs = [];
	matches.forEach((match) => {
		if (match.season == 2015) {
			arrayMatchIDs.push(match.id);
		}
	});
	//console.log(arrayMatchIDs);
	let bowlerStatsObj = {};
	deliveries.forEach((delivery) => {
		if (arrayMatchIDs.includes(delivery["match_id"])) {
			//console.log(delivery);
			let bowler = delivery.bowler;
			let runs = parseInt(delivery.total_runs);
			if (!bowlerStatsObj[bowler]) {
				bowlerStatsObj[bowler] = {};
				bowlerStatsObj[bowler]["total_runs"] = runs;
				bowlerStatsObj[bowler]["balls_bowled"] = 1;
				//console.log("test");
			} else {
				bowlerStatsObj[bowler]["total_runs"] += runs;
				bowlerStatsObj[bowler]["balls_bowled"] += 1;
			}
			bowlerStatsObj[bowler]["economy"] =
				(bowlerStatsObj[bowler]["total_runs"] * 6) /
				bowlerStatsObj[bowler]["balls_bowled"];
		}
	});
	//console.log(bowlerStatsObj);
	let bowlerArray = [];
	for (let bowler in bowlerStatsObj) {
		bowlerArray.push([bowler, bowlerStatsObj[bowler]["economy"]]);
	}
	bowlerArray.sort((a, b) => {
		return a[1] - b[1];
	});
	console.log(bowlerArray);
	let outputArray = [];
	for (let index = 0; index < 10; index++) {
		outputArray.push(bowlerArray[index]);
	}
	return JSON.stringify(outputArray);
}

fs.writeFileSync(
	"/home/chirag/IPL/src/public/output/4-output.JSON",
	economicalBowlers(),
	(err) => console.log("Data saved")
);
