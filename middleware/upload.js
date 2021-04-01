const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + 'NOTEASAP' + file.originalname);
    },
  });
const maxSize = 5 * 1024 * 1024; // for 1MB

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if ( file.mimetype == "image/png" ||file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      console.log(file )
      // console.log("here")
      cb(null, true);
    } else {
      cb({success: false,
        msg: 'Invalid file type. Only jpg, png image files are allowed.'},false);
    }
  },
  limits: { fileSize: maxSize },
}).single('file');
module.exports = upload