const multer=require('multer')

const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./files')
    },
    filename:function(req,file,cb) {
        cb(null,Date.now()+"NoTEASAP"+file.originalname)
    }
});

const  uploadfile=multer({
    storage:storage
})

module.exports=uploadfile;