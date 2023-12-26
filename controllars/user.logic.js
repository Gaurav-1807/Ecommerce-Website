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
          
            let obj = { username: username, email: email, password: hash, img: req.file.originalname }
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


const reset = async (req, res) => {
    let { email } = req.body
    let user = await UserSchema.findOne({ email })

    if (user) {
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
                // console.log(info)
                res.send("check your password")
            }
        })
        res.cookie("userId", user.id).send("sending otp")

    }
    else {
        res.send("user not found")
    }
}

const verify = (req, res) => {
    let verifyotp = req.params.otp
    if (verifyotp == otp) {
        res.render("newpass")
    }
    else {
        res.send("not verifying otp")
    }
}


const newpass = async (req, res) => {
    let id = req.cookies.userId
    let { password } = req.body
    console.log(id, password);
    bcrypt.hash(password, 5, async (err, hash) => {
        let data = await UserSchema.findByIdAndUpdate(id, { password :hash})

        console.log("data", data);
        data = await UserSchema.findById(id)
        console.log(data);
        res.send("data")


      
    })

}
const profiledata = async (req, res) => {
    let { id } = req.cookies
    let data = await UserSchema.findById(req.cookies.id)
    res.send(data)
    console.log(data);
}
module.exports = { signpage, signup, loginpage, login, profilepage, forgetform_page, reset, verify, profiledata, newpass }