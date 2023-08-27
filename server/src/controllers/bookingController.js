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
exports.updateOneBooking = catchAsync(async (req, res, next) => {
  let book = await Booking.findById(req.params.id);

  if (!book)
    return next(new AppError('Cannot find any result with this ID', 404));

  if (req.body.status === 'canceled' && book.status !== 'canceled') {
    if (book.point) {
      let point = await Point.findById(book.point.id);
      point.availableTickets += book.numOfTickets;
      await point.save();
    } else if (book.activity) {
      let activity = await Activity.findById(book.activity.id);
      activity.reservationLimit += book.numOfTickets;
      console.log(activity);
      await activity.save();
    }
  }
  book.status = req.body.status;
  // Update properties of the fetched book instance based on req.body
  // for (const key in req.body) {
  //   if (key !== 'status') {
  //     book[key] = req.body[key];
  //   }
  // }

  // Save the updated book instance
  await book.save();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: book,
  });
});

exports.createOneBooking = catchAsync(async (req, res, next) => {
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

    //  await Activity.findByIdAndDelete(req.body.activity);

    booking.activity = req.body.activity;

    // Check if same user book same activity
    await Booking.findOneAndRemove({
      activity: booking.activity,
      user: booking.user,
    });

    let availableTickets;
    const activity = await Activity.findById(booking.activity);
    availableTickets = activity.reservationLimit;

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
    await Booking.findOneAndRemove({
      point: booking.point,
      user: booking.user,
    });

    const point = await Point.findById(req.body.point);
    if (!point) return next(new AppError('Please Provide vaild point ID', 404));
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
