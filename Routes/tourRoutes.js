const express = require('express');
const tourController = require('../controllers/tourControllers');
const authController = require('../controllers/authController');
const router = express.Router();
const reviewRouter = require('./reviewRoutes');

// router.param("id", tourController.checkID);

// create a checkbody middleware
// check if body contains the name and price property
// if not, send 400(bad request)
// Add it to the post handler stack

// Post /tour/1028hro23ifn/reviews
// GET /tour/20938u41241/reviews
// GET /tour/20938u41241/reviews/2398fhs

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReviews
//   );

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTop, tourController.getAllDatas);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursDistance);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllDatas)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createData
  );

router
  .route('/:id')
  .get(tourController.getAllData)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateData
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteData
  );

module.exports = router;
