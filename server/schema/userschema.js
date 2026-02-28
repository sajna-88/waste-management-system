const mongoose =require ("mongoose")
const user= new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    role: { type: String, default: "user" }
})
module.exports=mongoose.model("user",user)