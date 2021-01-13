const mongoose=require('mongoose');
const Register=mongoose.model('Register',{
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    }
})
module.exports=Register;