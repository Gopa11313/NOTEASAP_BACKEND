const mongoose=require('mongoose')
const Comment=mongoose.model('Comment',{
    userId:{
        type:String,
        requried: true
    },
    noteId:{
        type:String,
        requried: true
    },
    Comment:{
        type:String

    }
})
module.exports=Comment;