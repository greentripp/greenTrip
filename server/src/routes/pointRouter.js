const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authControllers');
const {
  getAllPoints,
  getOnePoint,
  createOnePoint,
  deleteOnePoint,
  updateOnePoint,
  isAgent,
  setImagesInDB,
  uploadPointFiles,
} = require('../controllers/pointControllers');

router
  .route('/')
  .get(getAllPoints)
  .post(
    protect,
    restrictTo('admin'),
    uploadPointFiles,
    setImagesInDB,
    isAgent,
    createOnePoint
  );

router.use(protect);
router
  .route('/:id')
  .get(getOnePoint)
  .patch(uploadPointFiles, setImagesInDB, updateOnePoint)
  .delete(deleteOnePoint);

module.exports = router;
