const router = require('express').Router();
const { protect } = require('../controllers/authControllers');
const {
  createOneActivity,
  deleteOneActivity,
  getAllActivites,
  getOneActivity,
  updateOneActivity,
  deleteAllActivities,
} = require('../controllers/activityController');

router.delete('/all', deleteAllActivities);

router.route('/').get(getAllActivites).post(createOneActivity);

router
  .route('/:id')
  .get(getOneActivity)
  .patch(updateOneActivity)
  .delete(deleteOneActivity);
module.exports = router;
