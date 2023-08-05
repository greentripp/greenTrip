const router = require('express').Router({ mergeParams: true });

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  logout,
  updatePassword,
  adminLogin,
  loginUser,
} = require('../controllers/authControllers');

const {
  deleteAllUsers,
  getAllUsers,
  getUser,
  getMe,
  deleteMe,
  updateUserData,
} = require('../controllers/userControllers');

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

router.use(protect);
// router.patch('/updateUserAvatar', upload.array('avatar'), updateUserAvatar);
router.patch('/updateMyPassword', updatePassword);
router.route('/me').get(getMe, getUser).delete(deleteMe);
router.route('/:id').get(getUser);
router.patch('/updateUserData', updateUserData);

module.exports = router;
