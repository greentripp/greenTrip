const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authControllers');
const {
  createOneActivity,
  deleteOneActivity,
  getAllActivites,
  getOneActivity,
  updateOneActivity,
  getActivitiesByPoint,
} = require('../controllers/activityController');

const { upload, setImageInDB } = require('../controllers/imageController');

router
  .route('/')
  .get(getAllActivites)
  .post(
    protect,
    restrictTo('admin', 'user'),
    upload.single('photo'),
    setImageInDB('photo'),
    createOneActivity
  );

router.use(protect);
router.get('/points/:pointId', getActivitiesByPoint);
router
  .route('/:id')
  .get(getOneActivity)
  .patch(restrictTo('admin'), updateOneActivity)
  .delete(restrictTo('admin'), deleteOneActivity);
module.exports = router;
