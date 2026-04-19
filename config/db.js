const mongoose = require("mongoose");
// const dbgr = require("debug")("development:mongoose")
const config = require("config");
mongoose
.connect(`${config.get("MONGODB_URI")}/ecommerce`)
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(err);
})

module.exports = mongoose.connection;
