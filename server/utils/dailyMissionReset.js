const cron = require("node-cron");

const DailyMission = require("../models/DailyMission");

/*
========================================
RUN EVERY MIDNIGHT
========================================
*/

cron.schedule("0 0 * * *", async () => {
    try {

        console.log("Resetting Daily Missions...");

        const today = new Date().toISOString().split("T")[0];

await DailyMission.deleteMany({
    date: {
        $ne: today,
    },
});

        console.log("Daily Missions Reset Complete");

    } catch (err) {

        console.error(err);

    }
});

module.exports = {};