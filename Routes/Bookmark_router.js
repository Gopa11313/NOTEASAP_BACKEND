const express = require('express');
const router = express.Router();
const BookMark = require('../Models/BookMark');
const auth = require("../middleware/auth")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');

router.post('/note/bookmark',
    [
        check('userId', "userId must be filled").not().isEmpty(),
        check('noteId', "NoteId must be filled").not().isEmpty()
    ],
    auth.varifyUser,
    auth.varifyParticularUser, (req, res) => {
        const errros = validationResult(req);
        if (errros.isEmpty()) {
            var post_data = req.body
            var userId = post_data.userId/////check it and ask
            var noteId = post_data.noteId
            var data = BookMark({ userId: userId, noteId: noteId })
            data.save().then(function () {
                console.log("success")
                res.status(201).json({ success: true, msg: "Bookmarked" })
            }).catch(function (e) {
                res.status(500).json({ success: false, msg: "error" })
            })
        }
        else {
            res.status(400).json({ succes: true, msg: errros.array() })
        }
    })
router.get('/bookmark/notes/:id',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const userId = req.params.id
        BookMark.find({ userId: userId }).then(function (data) {
            console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {

            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })



router.get('/bookmark/notes/by/note/user/:id'),
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const userId = req.params.id
        const noteId = req.body.noteId
        BookMark.find({ userId: userId, noteId: noteId }).then(function (data) {
            //console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {

            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    }


/////// hernu prni chis
router.delete('/delete/bookmark/:noteId',
    auth.varifyUser,
    auth.varifyParticularUser,
    (req, res) => {
        const noteId = req.params.noteId;
        BookMark.deleteOne({noteId:noteId}).then(function () {
            console.log("here")
            res.status(200).json({ success: true, msg: "Bookmark Successfully deleted" })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "error" })
        })
    })

module.exports = router