const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide region name'],
    trim: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('Region', regionSchema);
