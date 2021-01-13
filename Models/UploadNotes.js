const mongoose=require('mongoose');
const UploadNote=mongoose.model('UploadNote',{
    file:{
        type:String
    },
    level:{
        type:String
    },
    subject:{
        type:String
    },
    c_name:{
        type:String
    },
    topic:{
        type:String
    },
    description:{
        type:String
    }
});
module.exports=UploadNote;
