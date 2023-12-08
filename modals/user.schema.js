const mongoose = require('mongoose')

const userchema = new mongoose.Schema({
    username : String,
    email:String,
    password : String
});

const UserSchema  = mongoose.model ("modal",userchema)

module.exports =UserSchema