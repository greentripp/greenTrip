const mongoose = require('mongoose');

const rewardSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide reward name'],
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    default: 'Exchange points to receive this voucher ',
  },
  pointOfInterest: {
    type: mongoose.Schema.ObjectId,
    ref: 'Point',
    required: [true, 'Reward must be in Point of interest'],
  },
  costPoints: {
    type: Number,
    required: [true, 'Please provide reward cost points'],
  },
  expireDate: {
    type: Date,
    required: [true, 'Please provide to expire date the reward'],
  },
  region: {
    type: String,
    required: [true, 'Please provide region to  the reward'],
  },
  address: {
    type: String,
    required: [true, 'Please provide address to the reward'],
  },
});

const Reward = mongoose.model('Reward', rewardSchema);
module.exports = Reward;
