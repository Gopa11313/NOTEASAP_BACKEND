const express = require('express');
const UploadNote = require('../Models/UploadNotes');
const router = express.Router();
const UploadNotes = require('../Models/UploadNotes');
const auth = require("../middleware/auth")
const multer = require("multer");
const { check, validationResult } = require('express-validator');
const uploadfile = require('../middleware/uploadfile');

router.post('/upload/note',
    [
        // check('file', "please select the file").not().isEmpty(),
        check('level', "please enter level").not().isEmpty(),
        check('subject', "please enter subject").not().isEmpty(),
        check('topic', "please enter topic").not().isEmpty(),
        check('userId', "UserID is needed").not().isEmpty()
    ],
    auth.varifyUser,
    auth.varifyAdminorUser,
    (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            var post_data = req.body;
            var file = "nofile";
            var level = post_data.level;
            var subject = post_data.subject;
            var c_name = post_data.c_name;
            var topic = post_data.topic;
            var description = post_data.description;
            var ratting = 0.00
            var userId = post_data.userId
            var data = new UploadNote({ file: file, level: level, subject: subject, c_name: c_name, topic: topic, description: description, ratting: ratting, userId: userId })
            data.save().then(function (data) {
                res.status(200).json({ success: true, msg: "User Register Success", id: data._id })
            }).catch(function (e) {
                console.log("here")
                res.status(201).json({ success: false, msg: "Some Error Occurs" })
            })
        }
        else {
            console.log(errors)
            res.status(201).json({ success: false, msg: "error" })
        }
    })

router.put("/upload/user/file/:id", auth.varifyUser, (req, res) => {
    console.log(req.file)
    const id = req.params.id
    uploadfile(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.status(201).json({ success: false, msg: "error" })
        }
        else if (err) {

            res.status(201).json({ success: false, msg: "not gonna happen" })
        }
        else {
            console.log(req.file + "hello")
            const id = req.params.id
            //console.log("hello")
            file = req.file.filename
            UploadNote.updateOne({ _id: id }, { file: file }).then(function () {
                res.status(200).json({ success: true, msg: "Done" })
            }).catch(function (e) {
                res.status(201).json({ success: false, msg: "not register" })
            })
        }
    })
})
router.get('/get/notes',
    (req, res) => {
        const userId = req.params.userId
        UploadNotes.find().then(function (data) {
            //console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            console.log("here")
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })
router.put('/Update/note',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        var post_data = req.body;
        const id = req.post_data.id
        var file = "saas";
        var level = post_data.level;
        var subject = post_data.subject;
        var c_name = post_data.c_name;
        var topic = post_data.topic;
        var description = post_data.description;
        var userId = post_data.userId
        UploadNotes.updateOne({ _id: id }, { file: file, level: level, subject: subject, c_name: c_name, topic: topic, description: description, userId: userId }).then(function (data) {
            //console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            console.log("here")
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })
router.get('/get/Ownnotes/:userId',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const userId = req.params.userId
        console.log(userId)
        UploadNotes.find({ userId: userId }).then(function (data) {
            console.log("here1")
            console.log("here" + data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            console.log("here")
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })
router.get('/get/Ownnotes/web/:userId',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const userId = req.params.userId
        console.log(userId)
        UploadNotes.find({ userId: userId }).then(function (data) {
            // console.log("here1")
            // console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            console.log("here")
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })

router.get('/note/by/notid/:id',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const id = req.params.id
        UploadNotes.find({ _id: id }).then(function (data) {
            // console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            console.log("here")
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })
router.get('/note/by/notid/web/:id',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const id = req.params.id
        UploadNotes.findOne({ _id: id }).then(function (data) {
            // console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            console.log("here")
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })
router.delete("/delete/note/:Nid",
    auth.varifyUser,
    auth.varifyAdminorUser,
    (req, res) => {
        const Nid = req.params.Nid;
        console.log(Nid)
        UploadNote.deleteOne({ _id: Nid }).then(function () {
            res.status(200).json({ success: true, msg: "Note Successfully deleted" })
        }).catch(function (e) {
            res.status(500).json({ success: false, msg: e })
        })
    })



router.get('/notes/showall',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        UploadNote.find().then(function (data) {
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            res.status(500).json({ success: false, msg: e })
        })
    })

router.put('/rate/the/note/:id/:ratting/:noofRating',
    auth.varifyUser, (req, res) => {
        console.log("here")
        const id = req.params.id
        const ratting = req.params.ratting
        console.log(id)
        console.log(ratting)
        const noofRating = req.params.noofRating
        console.log(noofRating)
        UploadNote.updateOne({ _id: id }, { ratting: ratting, noofRating: noofRating }).then(function () {
            res.status(200).json({ success: true, msg: "Thnak You For Your Ratting" })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "Somthing went wrong" })
        })
    }
)



router.post('/upload/note/with/file',
    [
        //check('file', "please select the file").not().isEmpty(),
        // check('level', "please enter level").not().isEmpty(),
        // check('subject', "please enter subject").not().isEmpty(),
        // check('topic', "please enter topic").not().isEmpty(),
        // check('userId', "UserID is needed").not().isEmpty()
    ], auth.varifyUser, (req, res) => {
        const errors = validationResult(req);
        console.log(req.body);
        if (errors.isEmpty()) {
            uploadfile(req, res, function (err) {

                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    res.status(201).json({ success: false, msg: "error" })
                }
                else if (err) {

                    res.status(201).json({ success: false, msg: "not gonna happen" })
                }
                else {
                    var post_data = req.body;
                    var file = req.file.filename;
                    console.log(file)
                    var level = post_data.level;
                    var subject = post_data.subject;
                    var c_name = post_data.c_name;
                    var topic = post_data.topic;
                    var description = post_data.description;
                    var ratting = 0.00
                    var userId = post_data.userId
                    var data = new UploadNote({ file: file, level: level, subject: subject, c_name: c_name, topic: topic, description: description, ratting: ratting, userId: userId })
                    data.save().then(function (data) {
                        res.status(200).json({ success: true, msg: "note uploded Successfully!!", id: data._id })
                    }).catch(function (e) {
                        console.log("here")
                        res.status(201).json({ success: false, msg: "Some Error Occurs" })
                    })
                }
            })
        }
        else {
            console.log(errors)
            res.status(201).json({ success: false, msg: "error" })
        }
    }
)



router.put('/Update/note/web',
auth.varifyUser,
    (req, res) => {
        // console.log("here")
        uploadfile(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.status(201).json({ success: false, msg: "error" })
            }
            else if (err) {

                res.status(201).json({ success: false, msg: "not gonna happen" })
            }
            else {
                var post_data = req.body;
                // console.log(post_data)
                const id = post_data.id
                var file = req.file.filename;
                //console.log(file)
                var level = post_data.level;
                var subject = post_data.subject;
                var c_name = post_data.c_name;
                var topic = post_data.topic;
                var description = post_data.description;
                var userId = post_data.userId
                console.log(level + subject)
                UploadNotes.updateOne({ _id: id }, { file: file, level: level, subject: subject, c_name: c_name, topic: topic, description: description, userId: userId }).then(function (data) {
                    console.log(data)
                    res.status(200).json({ success: true, data: data })
                }).catch(function (e) {
                    console.log("here")
                    res.status(201).json({ success: false, msg: "Some Error Occurs" })
                })
            }
        })
    })


module.exports = router