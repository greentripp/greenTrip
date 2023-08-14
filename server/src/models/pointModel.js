const mongoose = require('mongoose');
const slugify = require('slugify');

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
    costPoints: {
      type: String,
      required: [
        true,
        'Please provide num of cost Points to the Point of Interest',
      ],
    },
    category: {
      type: String,
      // required: [true, 'Please provide category to the Point of Interest'],
      enum: ['hotels', 'restruent'],
    },
    agent: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide agent to your Point'],
    },
    slug: { type: String, unique: true },
    qrcode: {
      type: String,
      required: [true, 'Please provide qrcode to your Point'],
    },
    description: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at dolor et quam hendrerit ultrices. In laoreet dignissim nisi, eu porttitor ipsum pellentesque ut. Nullam dui nibh, auctor eu sapien sed, aliquet consectetur dui. Donec maximus feugiat tellus, porta imperdiet magna. Sed massa magna, semper nec lobortis quis, consectetur in ex. Praesent venenatis feugiat consequat. Nam imperdiet eget nibh ut imperdiet. In aliquam ante dui, et vestibulum nunc ullamcorper a. Vestibulum bibendum et nisl in convallis. Nullam sit amet mauris semper, volutpat elit vel, scelerisque leo.',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

pointSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

pointSchema.virtual('activities', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'pointOfInterest',
});

pointSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'agent',
    select: 'name phone email',
  });
  next();
});

const Point = mongoose.model('Point', pointSchema);
module.exports = Point;
