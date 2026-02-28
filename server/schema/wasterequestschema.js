const mongoose = require("mongoose");

const wasteRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    username: { type: String, required: true },
    wasteType: { type: String, required: true }, // Organic, Plastic, E-waste
    address: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Pending, Collected
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WasteRequest", wasteRequestSchema);