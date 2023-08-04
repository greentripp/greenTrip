const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  point: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Book must belong to point of interest'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Book must belong to user'],
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'canceled'],
    default: 'pending',
  },
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const Booking = mongoose.model('booking', bookingSchema);
module.exports = Booking;
