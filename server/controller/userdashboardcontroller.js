const WasteRequest = require("../schema/wasterequestschema");
const mongoose = require('mongoose');

// 1. പുതിയൊരു വേസ്റ്റ് പിക്ക്അപ്പ് റിക്വസ്റ്റ് ഉണ്ടാക്കാൻ
const createWasteRequest = async (req, res) => {
    try {
        const { userId, username, wasteType, address } = req.body;

        const newRequest = new WasteRequest({
            userId,
            username,
            wasteType,
            address,
            status: "Pending" // റിക്വസ്റ്റ് അയക്കുമ്പോൾ തനിയെ പെൻഡിംഗ് ആയിരിക്കും
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

// 2. ലോഗിൻ ചെയ്ത യൂസറുടെ ഹിസ്റ്ററി/ട്രാക്കിംഗ് വിവരങ്ങൾ എടുക്കാൻ (നിങ്ങൾ ഇമേജിൽ നൽകിയത്)
const getUserRequests = async (req, res) => {
    try {
        // URL-ൽ നിന്ന് കിട്ടുന്ന userId വെച്ച് ഡാറ്റ കണ്ടെത്തുന്നു, പുതിയ വിവരങ്ങൾ മുകളിൽ വരാനായി sort ചെയ്യുന്നു
        const requests = await WasteRequest.find({ userId: req.params.userId }).sort({ date: -1 });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching history", 
            error: error.message 
        });
    }
};

// രണ്ട് ഫങ്ക്ഷനുകളും ഒന്നിച്ച് എക്സ്പോർട്ട് ചെയ്യുന്നു
module.exports = { 
    createWasteRequest, 
    getUserRequests 
};