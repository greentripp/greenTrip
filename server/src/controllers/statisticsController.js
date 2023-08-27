const User = require('../models/userModel');
const Point = require('../models/pointModel');
const Activity = require('../models/activiesModel');
const Booking = require('../models/bookingModel');
const Region = require('../models/regionModel');
const Reward = require('../models/rewardModel');

const catchAsync = require('../utils/catchAsync');

exports.getStatistics = catchAsync(async (req, res, next) => {
  const usersCount = await User.countDocuments();
  const pointsCount = await Point.countDocuments();
  const activitiesCount = await Activity.countDocuments();
  const bookingsCount = await Booking.countDocuments({ status: 'pending' });
  const regionsCount = await Region.countDocuments();
  const rewardsCount = await Reward.countDocuments();

  res.status(200).json({
    status: 'success',
    data: {
      users: usersCount,
      points: pointsCount,
      activities: activitiesCount,
      bookings: bookingsCount,
      regions: regionsCount,
      rewards: rewardsCount,
    },
  });
});
