const express = require("express");
const app = express();
require("dotenv").config()
const path = require("path");
const ejs = require("ejs");
const db = require("./config/db")
const indexfile = require("./routes/index");
const ownersRoutes = require("./routes/ownersRoutes");
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const expressSession = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000


app.use(expressSession({
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:false
}))
app.use(flash());

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.use("/owners", ownersRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/", indexfile);



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})