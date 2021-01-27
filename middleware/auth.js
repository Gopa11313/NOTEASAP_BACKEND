const jwt=require('jsonwebtoken');
const User=require("../Models/RegisterUSer")

module.exports.varifyUser=function(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(token)
        const decodedData=jwt.varifyUser(token,'secretkey');
        User.findById({_id:decodedData.userId}).then(function(alldata){
            req.user=alldata;
            next()
        }).catch(function(err){
            return res.status(402).json({msg:"Unauthorized access!"})
        })
    }
    catch(err){
        return res.status(402).json({msg:"Unauthorized access!"})
    }
}