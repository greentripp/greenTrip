const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/authControllers');
const { uploadPointFiles } = require('../controllers/pointControllers');
const {
  getAllPoints,
  getOnePoint,
  createOnePoint,
  deleteOnePoint,
  updateOnePoint,
  isAgent,
  setImagesInDB,
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
