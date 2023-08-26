const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const dotenv = require('dotenv');
const AppError = require('../utils/appError');

dotenv.config({ path: `${__dirname}/../.env` });

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

cloudinary.config({
  cloud_name: 'dm9uqoio5',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const multerStorage = multer.memoryStorage();

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

exports.uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new AppError('No file provided', 400));
    }

    cloudinary.uploader
      .upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      })
      .end(file.buffer);
  });
};

exports.setImageInDB = (imageName) => async (req, res, next) => {
  if (req.file) {
    try {
      req.body.imageName = await exports.uploadToCloudinary(req.file);
    } catch (error) {
      return next(error);
    }
  }
  next();
};

exports.setQrInDB = async (req, res, next) => {
  if (req.file) {
    try {
      req.body.qrcode = await exports.uploadToCloudinary(req.file);
    } catch (error) {
      return next(error);
    }
  }
  next();
};

exports.setPhotoInDB = async (req, res, next) => {
  if (req.file) {
    try {
      req.body.photo = await exports.uploadToCloudinary(req.file);
    } catch (error) {
      return next(error);
    }
  }
  next();
};

exports.setAvatarInDB = async (req, res, next) => {
  if (req.file) {
    try {
      req.body.avatar = await exports.uploadToCloudinary(req.file);
    } catch (error) {
      return next(error);
    }
  }
  next();
};
