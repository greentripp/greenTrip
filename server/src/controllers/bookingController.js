const Booking = require('../models/bookingModel');
const Point = require('../models/pointModel');
const User = require('../models/userModel');
const Activity = require('../models/activiesModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  createOne,
  deleteAll,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('./handleOps');

exports.deleteAllBooking = deleteAll(Booking);
exports.deleteOneBooking = deleteOne(Booking);
exports.getAllBooking = getAll(Booking);
exports.getOneBooking = getOne(Booking, {
  path: 'user point activity',
  select: '-role -active -passwordChangedAt -points -__v ',
});
exports.updateOneBooking = updateOne(Booking);
exports.createOneBooking = catchAsync(async (req, res, next) => {
  // check if type match the body.
  let booking = {
    type: req.body.type,
    user: req.body.user || req.user._id,
    numOfTickets: req.body.numOfTickets,
    numOfDays: req.body.numOfDays,
  };

  if (req.body.type === 'activity') {
    if (!req.body.activity)
      return next(new AppError('Please provide activity you wanna book', 400));
    booking.activity = req.body.activity;

    const activity = await Activity.findById(booking.activity);
    const availableTickets = activity.reservationLimit;

    try {
      if (booking.numOfTickets > availableTickets)
        return next(new AppError('Sorry, No enought Tickets', 400));
      activity.reservationLimit -= booking.numOfTickets;
      booking.paid = true;
      await activity.save();
    } catch (err) {
      booking.paid = false;
      activity.reservationLimit = booking.numOfTickets;
      await activity.save();
      next(err);
    }
  } else if (req.body.type === 'point') {
    if (!req.body.point)
      return next(
        new AppError('Please provide point of interest you wanna book', 400)
      );
    booking.point = req.body.point;

    const point = await Point.findById(req.body.point);
    const pointAvailableTickets = point.availableTickets;
    const user = await User.findById(booking.user);
    const userPoint = user.points;
    try {
      // decerase the number of points tickets if available tickets
      if (booking.numOfTickets > point.availableTickets)
        return next(new AppError('Sorry, No enought Tickets', 400));
      point.availableTickets -= booking.numOfTickets;

      // decrease user's point if  user has enought points to book
      if (point.costPoints > user.points)
        return next(new AppError('User does not have enought points', 400));
      user.points -= point.costPoints;

      booking.paid = true;
      await point.save();
      await user.save();
    } catch (err) {
      point.availableTickets = pointAvailableTickets;
      user.points = userPoint;
      booking.paid = false;
      await point.save();
      await user.save();
      next(err);
    }
  } else {
    return next(new AppError('Please provide type', 400));
  }

  const newBooking = await Booking.create(booking);

  res.send(newBooking);
});
