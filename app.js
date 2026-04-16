const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const db = require("./config/db")
const ownersRoutes = require("./routes/ownersRoutes");
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.use("/owners", ownersRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})