const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authControllers');
const {
  getAllBooking,
  createOneBooking,
  getOneBooking,
  updateOneBooking,
  deleteOneBooking,
} = require('../controllers/bookingController');

router.use(protect);
router.route('/').get(getAllBooking).post(createOneBooking);
router
  .route('/:id')
  .get(getOneBooking)
  .patch(updateOneBooking)
  .delete(deleteOneBooking);

module.exports = router;
