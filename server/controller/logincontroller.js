const User = require("../schema/userschema");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        console.log("--- Login Success ---");
        console.log("Database User Object:", user);
        res.status(200).json({
            message: "Login Successful",
            userId: user._id, 
            username: user.username || user.Username, 
            role: user.role || 'user'
        });

    } catch (error) {
        console.error("Login Controller Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { loginUser };