const router = require('express').Router();
const { protect } = require('../controllers/authControllers');
const {
  getAllPoints,
  getOnePoint,
  createOnePoint,
  deleteOnePoint,
  updateOnePoint,
  isAgent,
} = require('../controllers/pointControllers');

router.route('/').get(getAllPoints).post(isAgent, createOnePoint);

router
  .route('/:id')
  .get(getOnePoint)
  .patch(updateOnePoint)
  .delete(deleteOnePoint);

module.exports = router;
