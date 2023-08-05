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

exports.getAllPoints = catchAsync(getAll(Point));
exports.getOnePoint = catchAsync(
  getOne(Point, { path: 'agent', select: 'name phone email' })
);
exports.createOnePoint = catchAsync(createOne(Point));
exports.deleteOnePoint = catchAsync(deleteOne(Point));
exports.updateOnePoint = catchAsync(updateOne(Point));
exports.isAgent = catchAsync(async (req, res, next) => {
  const agentId = req.body.agent;
  console.log(agentId);
  const agent = await User.findById(agentId);
  console.log(agent);

  if (agent.role !== 'agent')
    return next(new AppError('Please insert vaild agent ID', 404));
});
