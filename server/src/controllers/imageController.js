const multer = require('multer');
const AppError = require('../utils/appError');
const path = require('path');

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

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir = '';

    if (file.fieldname === 'photo') {
      uploadDir = 'pointImg';
    } else if (file.fieldname === 'qrcode') {
      uploadDir = 'qr';
    } else if (file.fieldname === 'avatar') {
      uploadDir = 'avatars';
    } else {
      return cb(new AppError('Invalid fieldname for file upload', 400));
    }

    cb(
      null,
      path.join(__dirname, '..', '..', '..', 'public', 'img', uploadDir)
    );
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const filename = `${file.fieldname}-${Date.now()}.${ext}`;

    if (file.fieldname === 'photo') {
      req.body.photo = filename;
    } else if (file.fieldname === 'qrcode') {
      req.body.qrcode = filename;
    } else if (file.fieldname === 'avatar') {
      req.body.avatar = filename;
    }

    cb(null, filename);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please insert an image', 400), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.setQrInDB = (req, res, next) => {
  if (req.file) {
    req.body.qrcode = req.file.filename;
  }
  next();
};

exports.setPhotoInDB = (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.filename;
  }
  next();
};

exports.setImageInDB = (imageName) => (req, res, next) => {
  if (req.file) {
    req.body.imageName = req.file.filename;
  }
  next();
};

exports.setAvatarInDB = (req, res, next) => {
  if (req.file) {
    req.body.avatar = req.file.filename;
  }
  next();
};
