const express = require('express');
const {router} = require('./routes/user.routes');
const connect = require('./config/db');
require('dotenv').config()
const cookie = require("cookie-parser");
const { pro_router } = require('./routes/product.rout');
const { auth } = require('./middleware/auth');
const app = express();
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views",__dirname + '/views');


app.use("/user",router)
app.use("/product", pro_router)
app.get("/",auth,(req,res)=>{
    res.render("index")
})
app.listen(process.env.PORT,()=>{
    connect()
    console.log(`port listening on port ${process.env.PORT}`);
    
})