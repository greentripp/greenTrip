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
router
  .route('/')
  .get(getAllBooking)
  .post(restrictTo('admin'), createOneBooking);

router
  .route('/:id')
  .get(getOneBooking)
  .patch(restrictTo('admin'), updateOneBooking)
  .delete(restrictTo('admin'), deleteOneBooking);

module.exports = router;
