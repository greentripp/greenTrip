const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const { getAll, getOne, deleteAll } = require('./handleOps');

exports.getAllUsers = getAll(User);
exports.deleteAllUsers = deleteAll(User);
exports.getUser = getOne(User, 'vouchers bookings');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
  });
});

exports.updateUserData = catchAsync(async (req, res) => {
  if (req.body.password)
    return next(
      new AppError('You cannot change password through this api.', 400)
    );

  // update only name and email.
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updatePoints = async (userId, points, sign) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError('Cannot find user with this ID', 404);

  if (sign === '+') user.points += points;
  else if (sign === '-') {
    if (user.points < points)
      throw new AppError('User does not have enough points', 400);

    user.points -= points;
  }

  await user.save();
  return user;
};

exports.addPoints = catchAsync(async (req, res, next) => {
  const points = req.body.points;
  const user = await this.updatePoints(req.user._id, points, '+');

  req.user = user;
  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.removePoints = catchAsync(async (req, res, next) => {
  const points = req.body.points;
  const user = await this.updatePoints(req.user._id, points, '-');

  req.user = user;
  res.status(200).json({
    status: 'success',
    user,
  });
});
