const User=require("../schema/userschema") 
const mongoose = require('mongoose');

// 1. പുതിയ യൂസറെ രജിസ്റ്റർ ചെയ്യാൻ (Registration)
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // ഇമെയിൽ നിലവിൽ ഉണ്ടോ എന്ന് പരിശോധിക്കുന്നു
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // പുതിയ യൂസർ ഒബ്ജക്റ്റ് ഉണ്ടാക്കുന്നു
        const newUser = new User({
            username,
            email,
            password,
            role: role || "user" // റോൾ നൽകിയിട്ടില്ലെങ്കിൽ default ആയി 'user' എടുക്കും
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. എല്ലാ യൂസർമാരെയും കാണാൻ (അഡ്മിന് വേണ്ടി)
const getAllUsers = async (req, res) => {
    try {
        // അഡ്മിൻ ഒഴികെയുള്ള ബാക്കി എല്ലാ യൂസർമാരെയും ഡാറ്റാബേസിൽ നിന്ന് എടുക്കുന്നു
        const users = await User.find({ role: 'user' }); 
        res.status(200).json(users);
    } catch (error) {
        console.error("Fetch Users Error:", error.message);
        res.status(500).json({ message: "Error fetching users" });
    }
};

// 3. ഒരു യൂസറെ ഡിലീറ്റ് ചെയ്യാൻ (അഡ്മിന് വേണ്ടി)
const deleteUser = async (req, res) => {
    try {
        // URL-ൽ നിന്ന് കിട്ടുന്ന ID ഉപയോഗിച്ച് യൂസറെ കണ്ടെത്തുകയും ഡിലീറ്റ് ചെയ്യുകയും ചെയ്യുന്നു
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error.message);
        res.status(500).json({ message: "Error deleting user" });
    }
};

// എല്ലാ ഫങ്ക്ഷനുകളും ഒന്നിച്ച് എക്സ്പോർട്ട് ചെയ്യുന്നു
module.exports = { 
    registerUser, 
    getAllUsers, 
    deleteUser 
};