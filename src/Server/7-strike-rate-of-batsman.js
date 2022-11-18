//Find the strike rate of a batsman for each season
const matches = require("/home/chirag/IPL/src/data/matches.json");
const deliveries = require("/home/chirag/IPL/src/data/deliveries.json");
const fs = require("fs");

function strikeRate(batsman) {
	let matchIDsPerSeasonObj = {};
	matches.forEach((match) => {
		let season = match.season;
		let id = match.id;
		if (!matchIDsPerSeasonObj[season]) {
			matchIDsPerSeasonObj[season] = [];
			matchIDsPerSeasonObj[season].push(id);
		} else {
			matchIDsPerSeasonObj[season].push(id);
		}
	});
	//console.log(matchIDsPerSeasonObj);
	let outputObj = {};
	for (let season in matchIDsPerSeasonObj) {
		//outputObj[season] = [];
		let runs = 0,
			ballsFaced = 0;
		for (let matchID in matchIDsPerSeasonObj[season]) {
			//console.log("delivery");
			deliveries.forEach((delivery) => {
				//console.log(delivery.batsman_runs);
				if (delivery.match_id == matchID && delivery.batsman == batsman) {
					//console.log("test");
					runs += parseInt(delivery.batsman_runs);
					ballsFaced = parseInt(ballsFaced);
					ballsFaced++;
					//console.log("test");
				}
			});
		}
		//console.log(runs, ballsFaced);
		outputObj[season] = (runs * 100) / ballsFaced;
	}
	return JSON.stringify(outputObj, null, 2);
}
fs.writeFile(
	"/home/chirag/IPL/src/public/output/7-output.JSON",
	strikeRate("DA Warner"),
	(err) => console.log("data saved")
);
