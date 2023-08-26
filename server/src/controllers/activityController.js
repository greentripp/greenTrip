const Activity = require('../models/activiesModel');
const Point = require('../models/pointModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('./handleOps');

exports.getAllActivites = getAll(Activity, 'activities');
exports.deleteOneActivity = deleteOne(Activity);
exports.getOneActivity = getOne(Activity, 'pointOfInterest');
exports.updateOneActivity = updateOne(Activity);
exports.createOneActivity = createOne(Activity);

exports.getActivitiesByPoint = catchAsync(async (req, res, next) => {
  const activities = await Activity.find({
    pointOfInterest: req.params.pointId,
  });

  if (!activities) {
    return next(new AppError('No activities found for this point', 404));
  }

  res.status(200).json({
    status: 'success',
    result: activities.length,
    data: activities,
  });
});
