const express = require('express');
const router = express.Router();
const Comment = require('../Models/Comment');
const auth = require("../middleware/auth")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');

router.post('/comment/on/note',
    [
        check('userId', "userId must be filled").not().isEmpty(),
        check('noteId', "NoteId must be filled").not().isEmpty()
    ],
    auth.varifyUser,
    auth.varifyParticularUser, (req, res) => {
        const errros = validationResult(req);
        if (errros.isEmpty()) {
                var post_data=req.body
                var userId=post_data.userId
                var noteId=post_data.noteId
                var comment=post_data.comment
                var cmnt=Comment({userId:userId,noteId:noteId,comment:comment})
                cmnt.save().then(function () {
                    res.status(201).json({ success: true, msg: "Commented" })
                }).catch(function (e) {
                    res.status(500).json({ success: false, msg: "error" })
                })
        }
        else{
            res.status(400).json({succes:true,msg:errros.array()})
        }
})

router.put('/update/comment/:cmtId',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        var id=req.params.cmtId
        const comment=req.body.comment
        Comment.updateOne({_id:id,comment:comment}).then(function () {
            res.status(200).json({success:true, msg: "Update Successfull" })
        }).catch(function (e) {
            res.status(400).json({success:true, msg: "Error" })
        })
    })
module.exports=router