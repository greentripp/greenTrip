const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authControllers');
const {
  deleteAllBooking,
  getAllBooking,
  createOneBooking,
  getOneBooking,
  updateOneBooking,
  deleteOneBooking,
} = require('../controllers/bookingController');

router.delete('/all', deleteAllBooking);

router.use(protect);

router.route('/').get(getAllBooking).post(createOneBooking);

router
  .route('/:id')
  .get(getOneBooking)
  .patch(updateOneBooking)
  .delete(deleteOneBooking);

module.exports = router;
