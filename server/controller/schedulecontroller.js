const Schedule = require("../schema/scheduleschema");

const addSchedule = async (req, res) => {
    try {
        const { area, day, time, collectorName, vehicleNumber } = req.body;
        
        const newSchedule = new Schedule({
            area,
            day,
            time,
            collectorName,
            vehicleNumber
        });

        await newSchedule.save();
        res.status(201).json({ message: "Schedule added successfully" });
    } catch (error) {
        console.error("Schedule Add Error:", error.message);
        res.status(500).json({ message: "Error adding schedule", error: error.message });
    }
};

const getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Error fetching schedules" });
    }
};

// കയറ്റുമതി (Export) ഇങ്ങനെ മാത്രം മതി
module.exports = { addSchedule, getSchedules };