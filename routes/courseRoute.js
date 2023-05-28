const express = require('express');

const courseController = require('../controllers/courseController');
const   roleMiddleware = require('../middlewares/roleMiddleware')
const router = express.Router();

router.route('/createCourse').post(roleMiddleware(['trainer','admin']),courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);



module.exports = router;