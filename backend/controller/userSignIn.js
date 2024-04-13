const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignInController(req,res){
    try {
        const { email, password } = req.body
        
        if(!email){
            throw new Error("Please Enter Correct Email Address?")
        }
        if(!password){
            throw new Error("Please Enter Correct Password?")
        }
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("User Not Found!")
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        console.log("checkPassword ", checkPassword);
    } catch (err) {
        res.json({
            message: err.message || err ,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignInController