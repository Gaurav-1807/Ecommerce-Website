const { response } = require("express")
const cartmodel = require("../modals/cart.schema")
const ProductSchema = require("../modals/product.shema")

const Razorpay = require("razorpay")

const product_post = async (req, res) => {
    let { title, des, price, img } = req.body
    const data = await ProductSchema.create({
        title,
        des,
        price,
        img,
        UserId: req.cookies.id
    })
    res.send({msg:"product added succesfully",data})
}
const product_page = (req, res) => {
    res.render("productform")
}

const user_product = async (req, res) => {
    let data = await ProductSchema.find({UserId : req.cookies.id})
    res.send(data)
    // console.log(data)
}


const products = async (req, res) => {
    let data = await ProductSchema.find()
    res.send(data)
}

// cart  logic
const cart = async (req, res) => {
    let data = await cartmodel.create(req.body)
    res.send(data)
}
const cartdata =async (req, res) => {
    let data = await cartmodel.find({UserId:req.body.UserId}).populate("productID")
    res.send(data)
}
const cartpage = (req, res) => {
    res.render("cart")
}

const dproduct =  async(req, res) => {
    let { id } = req.params
 let data = await ProductSchema.findByIdAndDelete(id)
 res.send(data)
}


// qty logic
const quntity = async(req, res) => {
    let { id } = req.params
    let {val}=req.body
    let data = await cartmodel.findById(id)

    if(data.qty == 1 && val == -1){
        await cartmodel.findByIdAndDelete(id)
        return res.send({status: 'success'})
    }
    data.qty = data.qty + val ;
    await data.save()
    res.send(data)
}


// payment 

const razorpay = new Razorpay({
    key_id :"rzp_test_ZwsKvw5bh9rweM",
    key_secret :"ElVpauo6VzGuQEv8znHcuwwG"
})

const payment = (req, res) => {
    let {amount} =req.body
    let options ={
        amount : amount*100
    }
    razorpay.orders.create(options,(err , order) => {
        if(err){
            console.log(err)
            res.send({data : err.message})
        }
        else{
            res.send(order)
            
        }
    })
}
module.exports = { product_post, product_page , user_product, products,cart, cartdata,cartpage,dproduct, quntity,payment}