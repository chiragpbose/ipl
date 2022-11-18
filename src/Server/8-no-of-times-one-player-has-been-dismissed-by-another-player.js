//Find the highest number of times one player has been dismissed by another player
const matches = require("/home/chirag/IPL/src/data/matches.json");
const deliveries = require("/home/chirag/IPL/src/data/deliveries.json");
const fs = require("fs");

function dismissed() {
	let workingObj = {};
	for (let delivery of deliveries) {
		if (delivery.player_dismissed) {
			if (workingObj[`${delivery.player_dismissed} ${delivery.bowler}`]) {
				workingObj[`${delivery.player_dismissed} ${delivery.bowler}`]++;
			} else {
				workingObj[`${delivery.player_dismissed} ${delivery.bowler}`] = 1;
			}
		}
	}
	//console.log(workingObj);
	let outputObj = {};
	let keyForMax = 0;
	let max = 0;
	for (let key in workingObj) {
		if (workingObj[key] > max) {
			max = workingObj[key];
			keyForMax = key;
		}
	}
	outputObj[keyForMax] = max;
	return JSON.stringify(outputObj);
}

fs.writeFile(
	"/home/chirag/IPL/src/public/output/8-output.JSON",
	dismissed(),
	(error) => {
		console.log("Data saved");
	}
);
