const { Router } = require("express")
const { signpage, signup, loginpage, login, profilepage, forgetform_page, reset, verify, profiledata } = require("../controllars/user.logic")
const { auth } = require("../middleware/auth")
const multer = require("multer")
const router = Router()

const store = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

let upload = multer({
    storage: store

}).single('img')
router.get("/signup", signpage)
router.post("/signup",upload, signup)
router.get("/login", loginpage)
router.post("/login", login)
router.get("/profile", auth, profilepage)
router.get("/sendmail", forgetform_page)
router.post("/sendmail", reset)
router.get("/verify/:otp", verify)
// router.get("/profile/user", auth, profiledata)
router.get("/profiledata", profiledata)

module.exports = { router }