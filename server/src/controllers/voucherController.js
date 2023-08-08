const Voucher = require('../models/voucherModel');
const Reward = require('../models/rewardModel');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');
const {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  deleteAll,
} = require('./handleOps');
const User = require('../models/userModel');

exports.getAllVoucher = getAll(Voucher);
exports.getOneVoucher = getOne(Voucher, 'reward');
exports.deleteOneVoucher = deleteOne(Voucher);
exports.updateOneVoucher = updateOne(Voucher);
exports.deleteAllVoucher = deleteAll(Voucher);

exports.createOneVoucher = catchAsync(async (req, res, next) => {
  // GET the voucher
  const reward = await Reward.findById(req.body.reward).select('costPoints');
  const user = await User.findById(req.user._id);

  if (!reward) return next(new AppError('Cannot find any rewards', 404));

  const userPoints = user.points;

  try {
    // 1- Decrease reward point from user's points.
    if (reward.costPoints > user.points)
      return next(new AppError('Does not have enoght points', 400));
    user.points -= reward.costPoints;
    await user.save();

    req.body.paid = true;
    const voucher = await Voucher.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        voucher,
      },
    });
  } catch (err) {
    // Handle error here if needed
    user.points = userPoints;
    await user.save();
    next(err);
  }
});
