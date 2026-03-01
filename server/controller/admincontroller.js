const WasteRequest = require("../schema/wasterequestschema");

const getAllRequests = async (req, res) => {
    try {
        const allRequests = await WasteRequest.find().sort({ date: -1 });
        res.status(200).json(allRequests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching all requests", error: error.message });
    }
};
const updateRequestStatus = async (req, res) => {
    try {
        const { requestId, newStatus } = req.body;
        const updatedRequest = await WasteRequest.findByIdAndUpdate(
            requestId, 
            { status: newStatus }, 
            { new: true }
        );
        res.status(200).json({ message: "Status updated successfully", updatedRequest });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
};

module.exports = { getAllRequests, updateRequestStatus };