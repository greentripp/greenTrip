const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authControllers');
const {
  createOneActivity,
  deleteOneActivity,
  getAllActivites,
  getOneActivity,
  updateOneActivity,
  deleteAllActivities,
} = require('../controllers/activityController');

router.delete('/all', deleteAllActivities);

router
  .route('/')
  .get(getAllActivites)
  .post(restrictTo('admin'), createOneActivity);

router.use(protect);
router
  .route('/:id')
  .get(getOneActivity)
  .patch(restrictTo('admin'), updateOneActivity)
  .delete(restrictTo('admin'), deleteOneActivity);
module.exports = router;
