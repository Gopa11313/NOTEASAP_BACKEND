const multer=require('multer')

const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./files')
    },
    filename:function(req,file,cb) {
        cb(null,Date.now()+"NoTEASAP"+file.originalname)
    }
});
const filefilter= function(req,file,cb) {
    if(file.mimetype=='image/pdf' || file.mimetype=='image/docx'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const  uploadfile=multer({
    storage:storage,
    fileFilter:filefilter
})

module.exports=uploadfile;