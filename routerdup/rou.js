

const express = require('express');
const router = express.Router({ mergeParams: true });
const { reviewvalidate, isloggedin, allowonlyloggedinuserreview } = require('../authmiddleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchasync = require('../utils/catchAsync');

router.post('/',  catchasync(reviews.createReview))
// isloggedin,reviewvalidate,
router.delete('/:reviewId',  catchasync(reviews.deleteReview))
// allowonlyloggedinuserreview,, isloggedin
module.exports = router;



