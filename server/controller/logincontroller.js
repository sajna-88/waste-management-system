const User = require("../schema/userschema");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. ഇമെയിൽ ഉപയോഗിച്ച് യൂസറെ കണ്ടെത്തുന്നു
        const user = await User.findOne({ email });

        // 2. യൂസർ ഇല്ലെങ്കിൽ
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 3. പാസ്‌വേഡ് പരിശോധിക്കുന്നു
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // 4. ടെർമിനലിൽ ഡാറ്റ കാണാൻ (Debug Log)
        console.log("--- Login Success ---");
        console.log("Database User Object:", user);

        // 5. ഫ്രണ്ട് എൻഡിലേക്ക് ഡാറ്റ അയക്കുന്നു
        // നിങ്ങളുടെ സ്കീമയിൽ Username എന്നാണെങ്കിൽ user.Username എന്നും
        // username എന്നാണെങ്കിൽ user.username എന്നും ഇവിടെ കൃത്യമായി നൽകണം.
        res.status(200).json({
            message: "Login Successful",
            userId: user._id, 
            username: user.username || user.Username, // രണ്ടും ചെക്ക് ചെയ്യുന്നു
            role: user.role || 'user'
        });

    } catch (error) {
        console.error("Login Controller Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { loginUser };