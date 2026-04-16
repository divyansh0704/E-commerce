const mongoose = require("mongoose");




const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    contact:Number,
    image:String,
    cart:{
        type:Array,
        default:[]
    },
    isadmin:boolean,
    orders:{
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model("user",userSchema);