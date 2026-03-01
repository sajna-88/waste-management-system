const WasteRequest = require("../schema/wasterequestschema");
const mongoose = require('mongoose');

const createWasteRequest = async (req, res) => {
    try {
        const { userId, username, wasteType, address } = req.body;

        const newRequest = new WasteRequest({
            userId,
            username,
            wasteType,
            address,
            status: "Pending" 
        });

        await newRequest.save();
        res.status(201).json({ 
            message: "Waste pickup request sent successfully!", 
            data: newRequest 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error sending request", 
            error: error.message 
        });
    }
};

const getUserRequests = async (req, res) => {
    try {
        const requests = await WasteRequest.find({ userId: req.params.userId }).sort({ date: -1 });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching history", 
            error: error.message 
        });
    }
};

module.exports = { createWasteRequest, getUserRequests };