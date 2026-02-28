const express = require ("express")
const router= express.Router()
const usercontroller=require("../controller/usercontroller")
const logincontroller = require("../controller/logincontroller");
const dashboardcontroller = require("../controller/userdashboardcontroller");
const admincontroller = require("../controller/admincontroller");
const schedulecontroller = require("../controller/schedulecontroller");
const profilecontroller = require("../controller/profilecontroller");



router.post("/register",usercontroller.registerUser );
router.post("/login", logincontroller.loginUser);
router.post("/request-waste", dashboardcontroller.createWasteRequest);
router.get("/my-requests/:userId", dashboardcontroller.getUserRequests);
router.get("/all-requests", admincontroller.getAllRequests);
router.put("/update-status", admincontroller.updateRequestStatus);
router.get("/get-schedules", schedulecontroller.getSchedules);
router.post("/add-schedule", schedulecontroller.addSchedule);
router.get("/profile/:userId", profilecontroller.getUserProfile);
router.put("/profile-update/:userId", profilecontroller.updateUserProfile);
router.get("/all-users", usercontroller.getAllUsers);
router.delete("/delete-user/:id", usercontroller.deleteUser);
router.get("/my-requests/:userId", dashboardcontroller.getUserRequests);

module.exports=router;