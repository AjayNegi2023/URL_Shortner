const User = require("../Models/User");
const { getUser, verifyToken } = require("../Servies/auth");
const restrictToLoginUSer = async(req,res,next)=>{
    // const userId = req.cookies?.uuid;
    // if(!userId){
    //     return res.redirect("./login");
    // }

    // const user = getUser(userId);

    const token = req?.cookies?.token;
    const user = verifyToken(token);

    if(!user){
        return res.redirect("/login");
    }

    req.user = user;
    next();

}

const checkAuth = (req,res,next)=>{
    // const userId = req.cookies?.uuid;
    // const user = getUser(userId);

    const token = req?.cookies?.token;
    const user = verifyToken(token);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoginUSer,checkAuth
};