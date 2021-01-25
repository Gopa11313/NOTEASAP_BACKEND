const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs')
const Register=require('../Models/RegisterUSer');
const { response } = require('express');
const saltRounds = 10;
const {check,validationResult}=require('express-validator')


router.post("/user/add",
    [
        check('name',"Name must be filled").not().isEmpty(),
        check('email',"Enter a valid email").isEmail(),
        check('password',"Password must be 6 latter long").isLength({min:6})
    ],
    (req,res)=>{
        const errros=validationResult(req);
        if(errros.isEmpty()){
            var data1=req.body;
            var name=data1.name;
            var email=data1.email;
            var password=data1.password
            var image=data1.image
            const hash = bcrypt.hashSync(password, saltRounds);
            var data=new Register({name:name,email:email,password:hash,image:image})
            data.save().then(function(){
                res.send(req.body)
                res.status(201).json({Message:"User Register Success"})
            }).catch(function(e){ 
                res.send(e)
                res.status(500).json({Message:e})
            })
        }
        else{
          res.status(400).json(errros.array())
            res.send(errros.array())
        }    
})

router.post('/findUser',async (req,res)=>{
    const body = req.body;
    const register = await Register.findOne({ email: body.email });
    if (register) {
      const validPassword = await bcrypt.compare(body.password, register.password);
      if (validPassword) {
        res.send("Valid password" )
      } else {
        res.send("Invalid Password");
      }
    } else {
      res.send("User does not exist" );
    }
})
module.exports=router