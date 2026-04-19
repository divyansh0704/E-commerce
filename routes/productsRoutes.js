const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const productModel = require("../models/productModel");

// router.get("/",(req,res)=>{
//     res.send("hello products");

// })

router.post("/create",upload.single("image"),async(req,res)=>{
    // res.send("hello products");
    // res.send(req.file);
    try{
        let {name,price,discount,bgcolor,panelcolor,textcolor} = req.body;
    let image = req.file.buffer;
    let product = await productModel.create({
        name,
    price,
    discount,
    image,
    bgcolor,
    panelcolor,
    textcolor

    })
    req.flash("success","product created successfully");
    res.redirect("/owners/admin");
    }catch(err){
        res.send(err.message);
    }
})

module.exports = router;