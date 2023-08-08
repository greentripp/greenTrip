const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Voucher must belong to user'],
  },
  reward: {
    type: mongoose.Schema.ObjectId,
    ref: 'Reward',
    required: [true, 'Voucher must belong to reward'],
  },
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

voucherSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'reward',
    select: 'title description qrcode costPoints',
  });
  next();
});
voucherSchema.index({ reward: 1, user: 1 }, { unique: true });

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
