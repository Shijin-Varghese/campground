const express = require('express');

const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isloggedin,allowonlyloggedinuser, campgroundvalidate } = require('../authmiddleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isloggedin, upload.array('campground[image]'),campgroundvalidate, catchAsync(campgrounds.createCampground))
   
router.get('/new', isloggedin, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isloggedin,allowonlyloggedinuser ,upload.array('campground[image]'), campgroundvalidate, catchAsync(campgrounds.updateCampground))
    .delete(isloggedin,allowonlyloggedinuser, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isloggedin, catchAsync(campgrounds.renderEditForm))



module.exports = router;
