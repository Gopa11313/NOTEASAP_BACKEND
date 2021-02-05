const express = require('express');
const router = express.Router();
const BookMark = require('../Models/BookMark');
const auth = require("../middleware/auth")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');

router.post('/note/bookmark/',
    [
        check('userId', "userId must be filled").not().isEmpty(),
        check('noteId', "NoteId must be filled").not().isEmpty()
    ],
    auth.varifyUser,
    auth.varifyParticularUser,(req, res) => {
        const errros = validationResult(req);
        if (errros.isEmpty()) {
        var post_data = req.body
        var userId=post_data.userId
        var noteId=post_data.noteId
        var data=BookMark({userId:userId,noteId:noteId})
        data.save().then(function(){
            res.status(201).json({ success:true ,msg: "Bookmarked" })
        }).catch(function(e){
            res.status(500).json({ success:false,msg: "error"})
        })
        }
        else{
            res.status(400).json(errros.array())
            res.send(errros.array())
        }
    })
    module.exports = router