const {
  getAllReward,
  createOneReward,
  deleteAllReward,
  deleteOneReward,
  getOneReward,
  updateOneReward,
} = require('../controllers/rewardController');

const { upload, setQrInDB } = require('../controllers/imageController');

const router = require('express').Router();

// TODO: DELETE THIS
router.delete('/all', deleteAllReward);

// TODO: Add auth here
router
  .route('/')
  .get(getAllReward)
  .post(upload.single('qrcode'), setQrInDB, createOneReward);
router
  .route('/:id')
  .get(getOneReward)
  .patch(updateOneReward)
  .delete(deleteOneReward);

module.exports = router;
