const mongoose=require('mongoose');
const Register=mongoose.model('Register',{
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
})
module.exports=Register;