const bcrypt = require('bcrypt')
const UserSchema = require('../modals/user.schema')
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const otpGenerator = require('otp-generator')
const Getpath = require('../helper')
const signpage = (req, res) => {
    res.render("signup")
}
const signup = async (req, res) => {
  
    let { username, email, password } = req.body
    let users = await UserSchema.findOne({ email: email })
    console.log(req.file);
    if (!users) {
        bcrypt.hash(password, 5, async (err, hash) => {
            // let path = Getpath() + "/" + req.file.path


            let obj = { username: username, email: email, password: hash,img: req.file.originalname }
            let val = await UserSchema.create(obj)

            res.send({ msg: "creatred successfully ", data: val })
        })
    }
    else {
        res.redirect("/user/login")


    }
}
const loginpage = (req, res) => {
    res.render("login")
}

const login = async (req, res) => {
    const { email, password } = req.body
    let data = await UserSchema.findOne({ email: email })
    if (data) {
        bcrypt.compare(password, data.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ id: data._id }, "token")
                res.cookie("token", token).cookie("id", data._id).send({ msg: "loggin successful" })
            }
            else {
                res.send("password incorrect")
            }
        })
    }
    else {
        res.redirect("/user/signup")

    }
}
const profilepage = (req, res) => {
    res.render("profile")
}
// const user = async(req, res) => {
//     let {id}= req.cookies
//     let data = await UserSchema.findOne({id : id})
//     res.send(data)
//     console.log(data)
// }

const forgetform_page = (req, res) => {
    res.render("forgotpass")
}
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gauravambaliya77@gmail.com",
        pass: "rdtq krtk icbj ihbo"
    }
})

let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });


const reset = (req, res) => {
    let { email } = req.body
    const mailoption = {
        from: "gauravambaliya77@gmail.com",
        to: email,
        subject: "reset password",
        html: `<a href=http://localhost:8080/user/verify/${otp}> otp : ${otp} </a>`
    }
    transporter.sendMail(mailoption, (err, info) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(info)
        }
    })
    res.send("sending otp")
}

const verify = (req, res) => {
    verifyotp = req.params.otp
    if (verifyotp == otp) {
        res.send("verifying otp")
    }
    else {
        res.send("not verifying otp")
    }
}
const profiledata = async (req, res) => {
    let { id } = req.cookies
    let data = await UserSchema.findById(req.cookies.id)
    res.send(data)
    console.log(data);
}
module.exports = { signpage, signup, loginpage, login, profilepage, forgetform_page, reset, verify, profiledata }