const express=require('express');
const UploadNote = require('../Models/UploadNotes');
const router=express.Router();
const UploadNotes=require('../Models/UploadNotes');


router.post('/uploadnotes',(req,res)=>{
    var post_data=req.body;
    var file="";
    var level=post_data.level;
    var subject=post_data.level;
    var c_name=post_data.c_name;
    var topic=post_data.topic;
    var description=post_data.description;
    var data=new UploadNote({file:file,level:level,subject:subject,c_name:c_name,topic:topic,description:description})
    data.save().then(function(){
        res.send(data)
    }).catch(function(e){
        res.send(e)
    })
})
module.exports=router