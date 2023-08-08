const Reward = require('../models/rewardModel');
const {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
  deleteAll,
} = require('./handleOps');

exports.getAllReward = getAll(Reward);
exports.getOneReward = getOne(Reward, 'pointOfInterest');
exports.createOneReward = createOne(Reward);
exports.deleteOneReward = deleteOne(Reward);
exports.updateOneReward = updateOne(Reward);
exports.deleteAllReward = deleteAll(Reward);
