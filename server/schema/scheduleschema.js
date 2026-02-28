const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    area: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    collectorName: { type: String, required: true },
    vehicleNumber: { type: String, required: true }
});

module.exports = mongoose.model("Schedule", scheduleSchema);