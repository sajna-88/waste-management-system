const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/WMS")
var database=mongoose.connection
database.on("error",(err)=>[console.log(err)])
database.once("open",()=>[console.log("database connected")])

module.exports=database