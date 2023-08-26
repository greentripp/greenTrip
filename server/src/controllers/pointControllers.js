const Point = require('../models/pointModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('./handleOps');
const {
  upload,
  uploadToCloudinary,
  setQrInDB,
  setPhotoInDB,
} = require('./imageController');

exports.getAllPoints = getAll(Point);
exports.getOnePoint = getOne(Point, 'activities');
exports.createOnePoint = createOne(Point);
exports.deleteOnePoint = deleteOne(Point);
exports.updateOnePoint = updateOne(Point);

exports.isAgent = catchAsync(async (req, res, next) => {
  const agentId = req.body.agent;
  const agent = await User.findById(agentId);

  if (agent.role !== 'agent')
    return next(new AppError('Please insert vaild agent ID', 404));

  next();
});

exports.setImagesInDB = async (req, res, next) => {
  if (req.files) {
    try {
      req.body.photo = await uploadToCloudinary(req.files['photo'][0]);
      req.body.qrcode = await uploadToCloudinary(req.files['qrcode'][0]);
    } catch (error) {
      return next(error);
    }
  }
  next();
};

exports.uploadPointFiles = upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'qrcode', maxCount: 1 },
]);
