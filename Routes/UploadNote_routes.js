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
            var ratting = 1
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
            // An unknown error occurred when uploading.
            //console.log("hello")
            res.status(201).json({ success: false, msg: "not gonna happen" })
        }
        else {
            //console.log(req.file)
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
router.get('/get/notes/:userId',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const userId = req.params.userId
        UploadNotes.find({ userId: userId }).then(function (data) {
            //console.log(data)
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
            console.log(data)
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
//////also do update here
module.exports = router