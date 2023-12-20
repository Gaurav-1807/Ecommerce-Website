const mongoose = require('mongoose');

const cartschema = new mongoose.Schema({

    UserId : {type : mongoose.Schema.Types.ObjectId,ref :"modals"},
    productID : {type : mongoose.Schema.Types.ObjectId, ref :"Products"},
    qty : {type : Number, default:1}
})

const cartmodel = mongoose.model("cart",cartschema);

module.exports =cartmodel