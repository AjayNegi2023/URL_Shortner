const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID:{
        type:String,
        require:true,
        unique:true
    },
    redirectURL:{
        type:String,
        require:true
    },
    visitedHistory:[
        {timestamp: {
            type:Number
        }}
    ],
    createdBy :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamp:true})

const URLmodel = mongoose.model("url",urlSchema);

module.exports = URLmodel;