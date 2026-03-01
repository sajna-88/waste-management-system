const User=require("../schema/userschema") 
const mongoose = require('mongoose');

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }
        const newUser = new User({
            username,
            email,
            password,
            role: role || "user" 
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }); 
        res.status(200).json(users);
    } catch (error) {
        console.error("Fetch Users Error:", error.message);
        res.status(500).json({ message: "Error fetching users" });
    }
};
const deleteUser = async (req, res) => {
    try {

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error.message);
        res.status(500).json({ message: "Error deleting user" });
    }
};
module.exports = { registerUser, getAllUsers, deleteUser };