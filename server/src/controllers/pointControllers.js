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
  deleteAll,
} = require('./handleOps');
const { upload } = require('./imageController');

exports.getAllPoints = catchAsync(getAll(Point));
exports.getOnePoint = catchAsync(
  getOne(Point, { path: 'agent', select: 'name phone email' })
);
exports.createOnePoint = catchAsync(createOne(Point));
exports.deleteOnePoint = catchAsync(deleteOne(Point));
exports.updateOnePoint = catchAsync(updateOne(Point));
exports.deleteAllPoints = deleteAll(Point);

exports.isAgent = catchAsync(async (req, res, next) => {
  const agentId = req.body.agent;
  console.log(req.body);
  const agent = await User.findById(agentId);
  if (agent.role !== 'agent')
    return next(new AppError('Please insert vaild agent ID', 404));
  next();
});

exports.setImagesInDB = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.pointPhoto = req.file.filename;
    req.body.qrcode = req.file.filename;
  }
  next();
});
exports.uploadPointFiles = upload.fields([
  { name: 'pointPhoto', maxCount: 1 },
  { name: 'qrcode', maxCount: 1 },
]);
