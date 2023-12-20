const mongoose = require('mongoose')

const products = new mongoose.Schema({
    title : String,
    des : String,
    price : Number,
    img : String,
    UserId : {type : mongoose.Schema.Types.ObjectId,ref :"modals"}
})

const ProductSchema = mongoose.model('Products', products)

module.exports =ProductSchema