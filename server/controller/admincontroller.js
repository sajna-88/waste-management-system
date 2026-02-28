const WasteRequest = require("../schema/wasterequestschema");

// എല്ലാ യൂസർമാരുടെയും റിക്വസ്റ്റുകൾ അഡ്മിന് കാണാൻ
const getAllRequests = async (req, res) => {
    try {
        const allRequests = await WasteRequest.find().sort({ date: -1 });
        res.status(200).json(allRequests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching all requests", error: error.message });
    }
};

// ഒരു റിക്വസ്റ്റിന്റെ സ്റ്റാറ്റസ് അപ്‌ഡേറ്റ് ചെയ്യാൻ (ഉദാ: Pending -> Collected)
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