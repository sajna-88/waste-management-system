const User = require("../schema/userschema");

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
};
const updateUserProfile = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { username, email, password },
            { new: true }
        );
        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
};

module.exports = { getUserProfile, updateUserProfile };