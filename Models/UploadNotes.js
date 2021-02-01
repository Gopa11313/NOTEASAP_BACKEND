const mongoose=require('mongoose');
const UploadNote=mongoose.model('UploadNote',{
    file:{
        type:String,
        requried: true
    },
    level:{
        type:String,
        requried: true
    },
    subject:{
        type:String,
        requried: true
    },
    c_name:{
        type:String,
        requried: true
    },
    topic:{
        type:String,
        requried: true
    },
    description:{
        type:String
    },
    ratting:{
        type:Number
    },
    userId:{
        type:String
    }
});
module.exports=UploadNote;
