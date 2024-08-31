// Import multer
const multer = require('multer');

// Disk storage is used to create storage space
const storage = multer.diskStorage({
  // Destination: location in which the file is stored
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  // Filename: the name in which the file is stored
  filename: (req, file, callback) => {
    const filename = `image-${Date.now()}-${file.originalname}`; // Corrected interpolation
    callback(null, filename);
  }
});

// File filter - which type of file can upload
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    callback(null, true);
  } else {
    callback(null, false);
    return callback(new Error('Only png, jpg, jpeg files are allowed'));
  }
};

// Create multer config
const multerConfig = multer({
  storage,
  fileFilter
});

module.exports = multerConfig;
