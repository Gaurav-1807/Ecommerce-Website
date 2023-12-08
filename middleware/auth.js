const jwt = require("jsonwebtoken")

const auth = (req , res , next) =>{
    let token = req.cookies.token

    if(token){
        let decode = jwt.verify(token , "token")
        req.body.userId = decode.id
        next()
    }
    else{
        res.redirect("/user/login")
    }
}

module.exports = {auth}