//Find the bowler with the best economy in super overs
const matches = require("/home/chirag/IPL/src/data/matches.json");
const deliveries = require("/home/chirag/IPL/src/data/deliveries.json");
const fs = require("fs");

function bestEconomy() {
	let bowlerStatsObj = {};
	deliveries.forEach((delivery) => {
		if (delivery.is_super_over == 1) {
			let bowler = delivery.bowler;
			let runs = parseInt(delivery.total_runs);
			if (!bowlerStatsObj[bowler]) {
				bowlerStatsObj[bowler] = {};
				bowlerStatsObj[bowler]["total_runs"] = runs;
				bowlerStatsObj[bowler]["balls_bowled"] = 1;
			} else {
				bowlerStatsObj[bowler]["total_runs"] += runs;
				bowlerStatsObj[bowler]["balls_bowled"] += 1;
			}
			bowlerStatsObj[bowler]["economy"] =
				(bowlerStatsObj[bowler]["total_runs"] * 6) /
				bowlerStatsObj[bowler]["balls_bowled"];
		}
	});
	console.log(bowlerStatsObj);
	let min = 100000,
		keyForMin = 0;
	for (let key in bowlerStatsObj) {
		if (bowlerStatsObj[key]["economy"] < min) {
			min = bowlerStatsObj[key]["economy"];
			keyForMin = key;
		}
	}
	return JSON.stringify([keyForMin, bowlerStatsObj[keyForMin]]);
}

fs.writeFile(
	"/home/chirag/IPL/src/public/output/9-output.JSON",
	bestEconomy(),
	(err) => {
		console.log("Data is saved");
	}
);
