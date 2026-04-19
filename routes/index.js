const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel")

router.get("/",(req,res)=>{
    let error = req.flash("error")
    res.render("index",{error,loggedin:false});
})
router.get("/shop",isLoggedIn,async(req,res)=>{
    let products = await productModel.find();
    let success = req.flash("success")
    res.render("shop",{products,success});
    


    
})
router.get("/addtocart/:productid",isLoggedIn,async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop")

})
router.get("/cart",isLoggedIn,async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("cart");

    let bill=(Number(user.cart[0].price)+20) -Number(user.cart[0].discount) 


    res.render("cart",{user,bill});
})
module.exports = router;