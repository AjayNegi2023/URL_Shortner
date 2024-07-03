const User = require("../Models/User");
const {v4 : uuidv4} = require("uuid");
const { setUser, generateToken } = require("../Servies/auth");
const handledSignupUser = async(req,res)=>{
    const {name , email , password} = req.body;
    await User.create({name , email , password});
    return res.redirect("/");
}

const handledLoginUser = async(req,res)=>{
    const { email , password}= req.body;
    const user = await User.findOne({email, password});
    // if(!user){
    //     return res.render("login",{
    //         message : "Invalid username or password"
    //     });
    // }

    // const uuid = uuidv4();
    // setUser(uuid , user);
    // res.cookie("uuid",uuid);
     const token = generateToken(user);
     res.cookie("token",token);
    res.redirect("/");
}


module.exports = {
    handledSignupUser,handledLoginUser
}