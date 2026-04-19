const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", (req, res) => {
    res.send("hello owners");


})
router.post("/create", async (req, res) => {
    const { name, email, password } = req.body;
    const owner = await ownerModel.find();
    if (owner.length > 0) {
        return res.status(503).send("you dont have permission to create a owner.");

    }

    const createowner = await ownerModel.create({
        name,
        email,
        password

    })

    res.status(201).send(createowner);
})
router.get("/admin",isLoggedIn,async(req,res)=>{
    // res.send("its admin panel")
    let success = req.flash("success")
    res.render("createproducts",{success});

})

module.exports = router;