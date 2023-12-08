const {Router} = require("express")
const { signpage, signup, loginpage, login, profilepage, forgetform_page, reset, verify } = require("../controllars/user.logic")
const { auth } = require("../middleware/auth")

const router = Router()


router.get("/signup",signpage )
router.post("/signup",signup)
router.get("/login",loginpage)
router.post("/login",login)
router.get("/profile",auth,profilepage)
router.get("/sendmail",forgetform_page)
router.post("/sendmail",reset)
router.get("/verify/:otp",verify)
module.exports ={router}