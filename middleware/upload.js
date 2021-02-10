const multer=require('multer')

const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./images')
    },
    filename:function(req,file,cb) {
        cb(null,Date.now()+"NoTEASAP"+file.originalname)
    }
});
const filefilter=function (req,file,cb) {
    if(file.mimetype=='image/jpeg' || file.mimetype=='image/png' || file.mimetype=='image/gif'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const  upload=multer({
    storage:storage,
    fileFilter:filefilter
})

module.exports=upload;