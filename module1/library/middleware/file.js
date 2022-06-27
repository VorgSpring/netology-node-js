const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/books')
  },
  filename(req, file, cb) {
    const {id} = req.params;
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
});

const allowedTypes = ['application/pdf'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

module.exports = multer({
  storage, fileFilter
});
