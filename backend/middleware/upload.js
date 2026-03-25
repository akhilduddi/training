const multer = require('multer');
const path = require('path');

// Multer config for disk storage (temporary before Cloudinary upload)
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});
