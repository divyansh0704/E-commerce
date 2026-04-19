const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils/generatetoken")
module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, name } = req.body;
        let user = await userModel.find({ email });
        if (user.length > 0) {
            return res.status(401).send("user already exists");

        }
        const hashpassword = await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.send(err.message);
                } else {
                    let createuser = await userModel.create({
                        name,
                        email,
                        password: hash
                    })
                    let token = generateToken(createuser);
                    res.cookie("token", token);
                    // res.send({ createuser, token });
                    // res.send(token);
                    res.redirect("/shop")

                }
            })
        })




    } catch (err) {
        console.log(err.message);
    }


}

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.send("something went wrong.")
        }

        const isMatch = await bcrypt.compare(password, user.password, (err, result) => {

            console.log(result);
            if (!result) {
                return res.send("something went wrong");
            }

            let token = generateToken(user);
            res.cookie("token", token);

            // res.send("login successfully")
            res.redirect("/shop");

        });


    } catch (err) {
        console.log(err.message);
    }
}

module.exports.logoutUser = async(req,res)=>{
    res.clearCookie("token");
    res.redirect("/")
}