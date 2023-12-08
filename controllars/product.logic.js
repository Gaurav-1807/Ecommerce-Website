const ProductSchema = require("../modals/product.shema")


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
module.exports = { product_post, product_page , user_product, products}