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
} = require('../controllers/authControllers');

const {
  deleteAllUsers,
  getAllUsers,
  getUser,
  getMe,
  deleteMe,
  updateUserData,
  addPoints,
  removePoints,
} = require('../controllers/userControllers');

const { upload, setAvatarInDB } = require('../controllers/imageController');

// Auth

// !TODO: DELTE THIS BEFORE DEPLOY
// FOR DEV ONLY

router.delete('/all', deleteAllUsers);
router.route('/').get(getAllUsers);

router.post('/signup', signup);
router.post('/login', loginUser);
router.post('/adminLogin', adminLogin);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/resetPassword/verify/:token', verifyToken);

router.use(protect);
router.patch('/updateMyPassword', updatePassword);
router.route('/me').get(getMe, getUser).delete(deleteMe);
router.route('/:id').get(getUser);
router.patch(
  '/updateUserData',
  upload.single('avatar'),
  setAvatarInDB,
  updateUserData
);

router.patch('/points/add', restrictTo('admin'), addPoints);
router.patch('/points/remove', restrictTo('admin'), removePoints);
module.exports = router;
