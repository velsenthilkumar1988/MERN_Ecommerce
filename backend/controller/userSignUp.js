const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res){
    try {
        const  {email, password, name} = req.body
        //console.log("req.body", req.body)
        
        const user = await userModel.findOne({email})
        console.log("User",user);
        if(user){
            throw new Error("Already User Exit....")
        }
        if(!email){
            throw new Error("Please Provide Email?")
        }
        if(!password){
            throw new Error("Please Provide Password?")
        }
        if(!name){
            throw new Error("Please Provide UserName?")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("Something is Wrong")
        }

        const payLoad = {
            ...req.body,
            role : "GENERAL",
            password: hashPassword
        }
        const userData = new userModel(payLoad)
        const saveUser = await userData.save();

        res.status(201).json({
            data : saveUser,
            success: true,
            error: false,
            message : "User Data Save Successfully"
        })

    } catch (err) {
        //console.log("err:",error.message);
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController