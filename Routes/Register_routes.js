const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const bcrypt = require('bcryptjs')
const Register = require('../Models/RegisterUSer');
const { response } = require('express');
const saltRounds = 10;
const multer = require("multer");
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
            var image = "this is image"
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
                return res.status(201).json({ success: false, msg: "Invalid User!" })
            }
            Register.find({ email: req.body.email }).then(function (data) {
                const token = jwt.sign({ userId: userData._id }, 'secretkey');
                //console.log(data)
                res.status(200).json({ success: true, msg: "Login Successfull", token: token, data: data, id: userData._id })
            }).catch(function (e) {

            })
        })

    }).catch(function (e) {
        res.status(500).json({ success: false, msg: e })
    })
})


router.put("/upload/user/image/:id", auth.varifyUser, (req, res) => {
    const id = req.params.id
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("here")
            res.status(201).json({ success: false, msg: "error" })
        }
        else if (err) {
            res.status(201).json({ success: false, msg: "not gonna happen" })
        }
        else {
            const id = req.params.id
            image = req.file.filename
            Register.updateOne({ _id: id }, { image: image }).then(function () {
                res.status(200).json({ success: true, msg: "Done" })
            }).catch(function (e) {
                res.status(201).json({ success: false, msg: "not register" })
            })
        }
    })
})


//sir lae dekhauni
router.put('/user/update',
    auth.varifyUser,
    (req, res) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log("here")
                res.status(201).json({ success: false, msg: "error" })
            }
            else if (err) {
                res.status(201).json({ success: false, msg: "not gonna happen" })
            }
            else {
                //console.log(req.body)
                const id = req.body.id
                console.log(id)
                const name = req.body.name;
                const email = req.body.email;
                var password = req.body.password
                var image = req.file.filename
                //console.log(image)
                const hash = bcrypt.hashSync(password, saltRounds);
                Register.updateOne({ _id: id }, { name: name, email: email, password: hash, image: image }).then(function (data){
                    console.log(data)
                    res.status(200).json({ success: true, msg: "Update Successfull",data:data })
                    // console.log("here nigga")
                }).catch(function (e) {
                    res.status(201).json({ success: true, msg: "error here" })
                })
            }
        })
    })


router.get('/get/me/:id',
    auth.varifyUser,
    (req, res) => {
        const id = req.params.id
        // console.log(id)
        Register.find({ _id: id }).then(function (data) {
            // console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            res.status(200).json({ success: false, msg: e })
        })
    })

router.get('/get/me/web/:id',
    auth.varifyUser,
    (req, res) => {
        const id = req.params.id
        // console.log(id)
        Register.findOne({ _id: id }).then(function (data) {
            // console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            res.status(200).json({ success: false, msg: e })
        })
    })
module.exports = router