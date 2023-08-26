const {
  getAllReward,
  createOneReward,
  deleteOneReward,
  getOneReward,
  updateOneReward,
} = require('../controllers/rewardController');

const { protect, restrictTo } = require('../controllers/authControllers');
const { upload, setQrInDB0 } = require('../controllers/imageController');

const router = require('express').Router();

router.use(protect);

router
  .route('/')
  .get(getAllReward)
  .post(
    restrictTo('admin'),
    upload.single('qrcode'),
    setQrInDB0,
    createOneReward
  );
router
  .route('/:id')
  .get(getOneReward)
  .patch(
    restrictTo('admin'),
    upload.single('qrcode'),
    setQrInDB0,
    updateOneReward
  )
  .delete(restrictTo('admin'), deleteOneReward);

module.exports = router;
