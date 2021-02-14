const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const bcrypt = require('bcryptjs')
const Register = require('../Models/RegisterUSer');
const { response } = require('express');
const saltRounds = 10;
const auth = require("../middleware/auth")
const upload = require("../middleware/upload")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');


router.post("/user/add",
    [
        check('name', "Name must be filled").not().isEmpty(),
        check('email', "Enter a valid email").isEmail(),
        check('password', "Password must be 6 latter long").isLength({ min: 6 })
    ],
    (req, res) => {
        const errros = validationResult(req);
        if (errros.isEmpty()) {
            var data1 = req.body;
            var name = data1.name;
            var email = data1.email;
            var password = data1.password
            var image = data1.image
            var role = "User"
            const hash = bcrypt.hashSync(password, saltRounds);
            var data = new Register({ name: name, email: email, password: hash, image: image, role: role })
            data.save().then(function () {
                res.status(200).json({ success: true, msg: "User Register Success" })
            }).catch(function (e) {
                res.status(201).json({ success: false, msg: "Some Error Occurs" })
            })
        }
        else {
            res.status(201).json({ success: false, msg: "Error" })
        }
    })

router.post('/user/login', (req, res) => {
    const body = req.body;
    Register.findOne({ email: body.email }).then(function (userData) {
        if (userData == null) {
            return res.status(201).json({ success: false, msg: "Invalid User!!" })
        }
        bcrypt.compare(body.password, userData.password, function (err, result) {
            if (result == false) {
                return res.status(201).json({ success: false, msg: "Invalid User!!" })
            }
            const token = jwt.sign({ userId: userData._id }, 'secretkey');
            res.status(200).json({ success: true, msg: "Login Successfull", token: token })
        })

    }).catch(function (e) {
        res.status(500).json({ success: false, msg: e })
    })
})

router.put('/user/image/update/:UserID',
    auth.varifyUser,
    auth.varifyParticularUser,
    upload,
    (req, res) => {
            const id = req.params.UserID
            const image = req.file.path;
            Register.updateOne({ _id: id }, { image: image }).then(function () {
                res.status(200).json({ success: true, msg: "Update Successfull" })
            }).catch(function (e) {
                res.status(400).json({ success: false, msg: e })
            })
        }
    )

router.put('/user/update/:UserID',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const id = req.params.UserID
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password
        const image = req.body.image
        Register.updateMany({ _id: id }, { name: name }, { email: email }, { password: password }, { image: image }).then(function () {
            res.status(200).json({ success: true, msg: "Update Successfull" })
        }).catch(function (e) {
            res.status(400).json({ success: true, msg: e })
        })
    })

// router.get("/get/me",
// auth.varifyUser,
// (req,res)=>{
//     const user = await User.findById(req.user.id);
//     res.status(200).json({​​​​
//       success: true,
//       data: user,

//     }​​​​);

// })
module.exports = router