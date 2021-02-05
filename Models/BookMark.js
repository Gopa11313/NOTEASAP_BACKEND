const mongoose=require('mongoose');
const Bookmark=mongoose.model('Bookmark',{
    userId:{
        type:String,
        requried: true
    },
    noteID:{
        type:String,
        requried: true
    },
});
module.exports=Bookmark;
