const {Router} = require("express")
const { product_post, product_page, user_product, products, cart, cartdata, cartpage, dproduct, quntity, payment } = require("../controllars/product.logic")
const { auth } = require("../middleware/auth")



const pro_router = Router()

pro_router.get('/form',auth, product_page)
pro_router.post("/post",auth ,product_post)
pro_router.get("/userproducts",auth, user_product)
pro_router.get("/products",auth, products)
pro_router.get("/cartpage",auth,cartpage)
pro_router.post("/cart/:id",auth, cart)
pro_router.get("/cartdata",auth, cartdata)
pro_router.delete("/delete/:id",auth, dproduct)
pro_router.patch("/cart/update/:id", auth, quntity)
pro_router.post("/payment", auth, payment)
module.exports ={pro_router}