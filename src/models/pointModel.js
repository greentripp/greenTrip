const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your agent name'],
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: [true, 'Please provide address to the Point of Interest'],
    },
    region: String,
    photo: {
      type: String,
      required: [true, 'Please provide photo to the Point of Interest'],
    },
    availableTickets: {
      type: Number,
      required: [
        true,
        'Please provide num of availableTickets to the Point of Interest',
      ],
    },
    category: {
      type: String,
      enum: ['hotels', 'restruent'],
    },
    activites: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Activity',
      },
    ],
    agent: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide agent to your Point'],
    },
    slug: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

pointSchema.index({ slug: 1 });

pointSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Point = mongoose.model('Point', pointSchema);
module.exports = Point;
