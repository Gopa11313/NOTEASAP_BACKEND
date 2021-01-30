const express = require('express');
const UploadNote = require('../Models/UploadNotes');
const router = express.Router();
const UploadNotes = require('../Models/UploadNotes');
const auth=require("../middleware/auth")
const { check, validationResult } = require('express-validator')

router.post('/upload/note',
    [
        check('file', "please select the file").not().isEmpty(),
        check('level', "please enter level").not().isEmpty(),
        check('subject', "please enter subject").not().isEmpty(),
        check('topic', "please enter topic").not().isEmpty()
    ]
    , (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            var post_data = req.body;
            var file = post_data.file;
            var level = post_data.level;
            var subject = post_data.level;
            var c_name = post_data.c_name;
            var topic = post_data.topic;
            var description = post_data.description;
            var ratting=1
            var data = new UploadNote({ file: file, level: level, subject: subject, c_name: c_name, topic: topic, description: description,ratting:ratting })
            data.save().then(function () {
                res.send(req.body)
                res.status(201).json({ Message: "Note Uploaded Successfully" })
            }).catch(function (e) {
                res.send(e)
                res.status(500).json({ Message: e })
            })
        }
        else {
            res.status(400).json(errors.array())
            res.send(errors.array())
        }
    })

router.get('/get/notes', (req, res) => {
    UploadNotes.find().then(function (data) {
        res.send([data])
    })
})

router.delete("/delete/note/:Nid",auth.varifyUser,(req, res) => {
    const Nid = req.params.Nid;
    UploadNote.deleteOne({ _id: Nid }).then(function () {
        res.status(200).json({msg:"Note Successfully deleted"})
    }).catch(function (e) {
        res.status(500).json({msg:e})
    })
})


module.exports = router