const URLmodel = require("../Models/URL");

const handleRendering = async(req,res)=>{
    if(!req.user){
            return res.redirect("/login");
    }
    const allUrls = await URLmodel.find({createdBy : req.user._id})
    return res.render("home",{
    urls:allUrls
});
}

module.exports = handleRendering;