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

const { setPhotoInDB0, upload } = require('../controllers/imageController');

router
  .route('/')
  .get(getAllPoints)
  .post(
    protect,
    restrictTo('admin'),
    upload.single('photo'),
    setPhotoInDB0,
    isAgent,
    createOnePoint
  );

router.use(protect);
router
  .route('/:id')
  .get(getOnePoint)
  .patch(upload.single('photo'), setPhotoInDB0, updateOnePoint)
  .delete(deleteOnePoint);

module.exports = router;
