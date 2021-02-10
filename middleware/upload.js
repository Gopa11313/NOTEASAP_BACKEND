const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + 'NOTEASAP' + file.originalname);
    }
  });
   
  let fileFilter = function (req, file, cb) {
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only jpg, png image files are allowed.'
        }, false);
    }
  };
  let obj = {
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
  },
    fileFilter: fileFilter
  };
  const upload = multer(obj).single('image'); // upload.single('file')
  fileUpload = (req, res) => {
    upload(req, res, function (error) {
        if (error) { //instanceof multer.MulterError
            res.status(500);
            if (error.code == 'LIMIT_FILE_SIZE') {
                error.message = 'File Size is too large. Allowed file size is 200KB';
                error.success = false;
            }
            return res.json(error);
        } else {
            if (!req.file) {
                res.status(500);
                res.json('file not found');
            }
            res.status(200);
            res.json({
                success: true,
                message: 'File uploaded successfully!'
            });
        }
    })
  };
  module.exports = fileUpload
