const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Voucher must belong to user'],
  },
  reward: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Voucher must belong to reward'],
  },
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
