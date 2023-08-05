const Point = require('../models/pointModel');
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

/*
active": false,
"__v": 0,
"id": "64cb63913678aaeaf97a2653"
                */
