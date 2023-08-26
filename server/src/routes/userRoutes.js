const router = require('express').Router({ mergeParams: true });

const {
  signup,
  forgotPassword,
  resetPassword,
  protect,
  logout,
  updatePassword,
  adminLogin,
  loginUser,
  verifyToken,
  restrictTo,
  addAdmin,
} = require('../controllers/authControllers');

const {
  getAllUsers,
  getUser,
  getMe,
  deleteMe,
  updateUserData,
  addPoints,
  removePoints,
  updateUser,
} = require('../controllers/userControllers');

const { upload, setAvatarInDB } = require('../controllers/imageController');
const catchAsync = require('../utils/catchAsync');

// Auth

router.post('/signup', signup);
router.post('/login', loginUser);
router.post('/adminLogin', adminLogin);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/resetPassword/verify/:token', verifyToken);

router.use(protect);
router.route('/').get(restrictTo('admin'), getAllUsers);
router.patch('/updateMyPassword', updatePassword);
router.route('/me').get(getMe, getUser).delete(deleteMe);
router.route('/:id').get(getUser);
router.patch(
  '/updateUserData',
  upload.single('avatar'),
  setAvatarInDB,
  updateUserData
);

router.patch('/points/add', restrictTo('admin', 'user'), addPoints);
router.patch('/points/remove', restrictTo('admin', 'user'), removePoints);

restrictTo('admin');
router.post('/admin/add', upload.single('avatar'), setAvatarInDB, addAdmin);
router.patch(
  '/admin/update/:id',
  upload.single('avatar'),
  setAvatarInDB,
  updateUser
);
module.exports = router;
