const mongoose = require('mongoose')

const userchema = new mongoose.Schema({
    username : String,
    email:String,
    password : String,
    img :String
});

const UserSchema  = mongoose.model ("modals",userchema)

module.exports =UserSchema