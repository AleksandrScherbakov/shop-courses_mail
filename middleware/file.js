const multer = require("multer");
const storage = multer.diskStorage({
    destination(req, file, cb){
        return cb(null, 'images/')
    },
    filename(req, file, cb){
        return cb(null, new Date().toISOString() + "-" + file.originalname)
    }
});
const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
const fileFilter = (req, file, cb) => {
  if(allowedTypes.includes(file.mimetype)){
      return cb(null, true)
  } else{
      return cb(null, false)
  }
};

module.exports = multer({storage, fileFilter});