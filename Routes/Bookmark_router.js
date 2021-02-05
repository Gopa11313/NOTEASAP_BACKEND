const express = require('express');
const router = express.Router();
const BookMark = require('../Models/BookMark');
const auth = require("../middleware/auth")
const { check, validationResult } = require('express-validator');
const { json } = require('body-parser');

router.post('/note/bookmark/',
    [
        check('userId', "userId must be filled").not().isEmpty(),
        check('noteID', "NoteId must be filled").not().isEmpty()
    ],
    auth.varifyUser,
    auth.varifyParticularUser,(req, res) => {
        const errros = validationResult(req);
        if (errros.isEmpty()) {
        var post_data = req.body
        var userID=post_data.userID
        var noteID=post_data.noteID
        var data=BookMark({userID:userID,noteID:noteID})
        data.save().then(function(){
            res.status(201).json({ success:true ,msg: "User Register Success" })
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