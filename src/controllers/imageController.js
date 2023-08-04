const multer = require('multer');

const AppError = require('../utils/appError');

// exports.upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1000000000, files: 2 },
// });

exports.imageErrorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'file is too large',
      });
    }

    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        message: 'File limit reached',
      });
    }

    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        message: 'File must be an image',
      });
    }
  }
  next(error);
};
