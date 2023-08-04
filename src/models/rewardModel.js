const mongoose = require('mongoose');

const rewardSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide reward name'],
    trim: true,
    lowercase: true,
  },
  costPoints: {
    type: Number,
    required: [true, 'Please provide reward cost points'],
  },
  expireDate: Date,
  description: String,
  region: String,
  address: String,
});

const Reward = mongoose.model('Reward', rewardSchema);
module.exports = Reward;
