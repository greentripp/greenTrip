const router = require('express').Router();
const {
  getAllPoints,
  getOnePoint,
  createOnePoint,
  deleteOnePoint,
  updateOnePoint,
} = require('../controllers/pointControllers');

router.route('/').get(getAllPoints).post(createOnePoint);
router
  .route('/:id')
  .get(getOnePoint)
  .patch(updateOnePoint)
  .delete(deleteOnePoint);

module.exports = router;
