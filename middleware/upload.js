const multer = require("multer");

var maxSize = 1 * 1000 * 1000;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ ".png")
  }
})

var upload = multer({ storage: storage, limits: { fileSize: maxSize }})

module.exports = {
  upload, storage
}