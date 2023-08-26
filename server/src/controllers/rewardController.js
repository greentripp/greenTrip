const Reward = require('../models/rewardModel');
const {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} = require('./handleOps');

exports.getAllReward = getAll(Reward);
exports.getOneReward = getOne(Reward);
exports.createOneReward = createOne(Reward);
exports.deleteOneReward = deleteOne(Reward);
exports.updateOneReward = updateOne(Reward);
