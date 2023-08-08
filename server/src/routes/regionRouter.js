const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authControllers');
const {
  getAllRegion,
  createOneRegion,
  deleteAllRegion,
  getOneRegion,
  updateOneRegion,
  deleteOneRegion,
} = require('../controllers/regionController');

router.delete('/all', deleteAllRegion);

router.use(protect);
router.route('/').get(getAllRegion).post(restrictTo('admin'), createOneRegion);

router
  .route('/:id')
  .get(getOneRegion)
  .patch(restrictTo('admin'), updateOneRegion)
  .delete(restrictTo('admin'), deleteOneRegion);
module.exports = router;