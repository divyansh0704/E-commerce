const mongoose = require("mongoose");




const ownerSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String,
    products:{
        type:Array,
        default:[]
    },
    gstin:String
})

module.exports = mongoose.model("owner",ownerSchema);