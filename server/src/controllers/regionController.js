const Region = require('../models/regionModel');
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('./handleOps');

exports.createOneRegion = createOne(Region);
exports.deleteOneRegion = deleteOne(Region);
exports.getAllRegion = getAll(Region);
exports.getOneRegion = getOne(Region);
exports.updateOneRegion = updateOne(Region);
