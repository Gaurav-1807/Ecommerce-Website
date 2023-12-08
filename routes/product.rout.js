const {Router} = require("express")
const { product_post, product_page, user_product, products } = require("../controllars/product.logic")
const { auth } = require("../middleware/auth")



const pro_router = Router()

pro_router.get('/form',auth, product_page)
pro_router.post("/post",auth ,product_post)
pro_router.get("/userproducts",auth, user_product)
pro_router.get("/products",auth, products)

module.exports ={pro_router}