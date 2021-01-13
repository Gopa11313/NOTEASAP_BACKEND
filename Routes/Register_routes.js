const express=require('express');
const router=express.Router();
const crypto=require('crypto');
const Register=require('../Models/RegisterUSer');
const { response } = require('express');

var getRandomString=function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') //convert to hexa format
        .slice(0,length);
}

var sha512=function(password,salt){
    var hash=crypto.createHmac('sha512',salt);
    hash.update(password);
    var value=hash.digest('hex')
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword){
    var salt=getRandomString(16); //create 16 random charachter
    var passwordData=sha512(userpassword,salt)
    return passwordData 
}

function checkHashPassword(userPassword,salt){
    var passwordData=sha512(userPassword,salt)
    return passwordData;
}


router.post("/insert",(req,res)=>{
    console.log(res.body);
    var post_data=req.body;
    var plaint_password=post_data.password;
    var hash_data=saltHashPassword(plaint_password)
    var Rpassword=hash_data.passwordHash //save password hash
    var salt=hash_data.salt;// save salt
    var Rname=post_data.name ;
    var Remail=post_data.email;
    // var image
    var data=new Register({id:1,name:Rname,email:Remail,password:Rpassword,image:""})
    data.save().then(function(){
        res.send(req.body)
        console.log(req.body)
    }).catch(function(e){ 
        res.send(e)
    })
})
router.post('/findUser',(req,res)=>{
    var data=req.body;
    var email=data.email;
    var USerpassword=data.password;
    Register.find({'email':email}).count(function(err,number){
        if(number==0){
            // response.json("Email not Exists")
            console.log("Email not Exists")
            res.send("Email not Exists")
        }
        else{
            Register.find({'email':email},(function(err,register){
                console.log("test")
                var salt=register.salt
                var hashed_Password=checkHashPassword(Userpassword,salt).passwordHash;
                var enripted_password=register.password;
                if(hashed_Password==enripted_password){
                    res.send("login Successfully")
                    console.log("login Successfully")
                }
                else{
                    res.send("Wrong password")
                    console.log("Wrong password")
                }
            }))
        }
})
})
module.exports=router