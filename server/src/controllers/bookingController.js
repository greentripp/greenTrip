const Booking = require('../models/bookingModel');
const Point = require('../models/pointModel');
const User = require('../models/userModel');
const Activity = require('../models/activiesModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { deleteOne, getAll, getOne, updateOne } = require('./handleOps');

exports.deleteOneBooking = deleteOne(Booking);
exports.getAllBooking = getAll(Booking);
exports.getOneBooking = getOne(Booking);
exports.updateOneBooking = updateOne(Booking);

exports.createOneBooking = catchAsync(async (req, res, next) => {
  // check if type match the body.
  let booking = {
    type: req.body.type,
    user: req.body.user || req.user._id,
    numOfTickets: req.body.numOfTickets,
    numOfDays: req.body.numOfDays,
  };
  let newBooking;

  if (req.body.type === 'activity') {
    if (!req.body.activity)
      return next(new AppError('Please provide activity you wanna book', 400));

    booking.activity = req.body.activity;

    // Check if same user book same activity
    const existingActivity = await Booking.findOne({
      activity: booking.activity,
      user: booking.user,
    });

    if (existingActivity)
      return next(new AppError('You booked this Activity before', 400));

    const activity = await Activity.findById(booking.activity);
    const availableTickets = activity.reservationLimit;

    try {
      if (booking.numOfTickets > availableTickets)
        return next(new AppError('Sorry, No enought Tickets', 400));

      activity.reservationLimit -= booking.numOfTickets;

      booking.paid = true;

      await activity.save();

      newBooking = await Booking.create(booking);

      res.status(201).json({
        status: 'success',
        data: {
          booking: newBooking,
        },
      });
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

    // Check if same user book same point
    const existingPoint = await Booking.findOne({
      point: booking.point,
      user: booking.user,
    });

    if (existingPoint)
      return next(new AppError('You booked this Point before', 400));

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
      newBooking = await Booking.create(booking);
      res.status(201).json({
        status: 'success',
        data: {
          booking: newBooking,
        },
      });
    } catch (err) {
      point.availableTickets = pointAvailableTickets;
      user.points = userPoint;
      booking.paid = false;
      await point.save();
      await user.save();
      console.log(err);
      next(err);
    }
  } else {
    return next(new AppError('Please provide type', 400));
  }
});
