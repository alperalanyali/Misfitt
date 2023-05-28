const express = require('express');

const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();



router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/service').get(pageController.getServicePage)
router.route('/trainer').get(pageController.getTrainerPage)
router.route('/news').get(pageController.getNewsPage)
router.route('/gallery').get(pageController.getGalleryPage)
router.route('/login').get(redirectMiddleware,pageController.getLoginPage);
router.route('/register').get(redirectMiddleware,pageController.getRegisterPage);

module.exports = router;
