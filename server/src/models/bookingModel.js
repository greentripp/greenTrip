const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, 'A Booking must have a type'],
    enum: ['activity', 'point'],
  },
  point: {
    type: mongoose.Schema.ObjectId,
    ref: 'Point',
  },
  activity: { type: mongoose.Schema.ObjectId, ref: 'Activity' },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A Booking must belong to user'],
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'canceled'],
    default: 'pending',
  },
  numOfTickets: { type: Number, default: 1 },
  numOfDays: { type: Number, default: 1 },
  paid: { type: Boolean, default: false },
  // startDate: {
  //   type: Date,
  //   required: [true, 'A Booking must have start Date'],
  // },
  // endDate: Date,
  createdAt: { type: Date, default: Date.now() },
});

bookingSchema.index({ point: 1, user: 1 }, { unique: true });
bookingSchema.index({ activity: 1, user: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
