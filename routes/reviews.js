
const express = require('express');
const router = express.Router({ mergeParams: true });
const { reviewvalidate, isloggedin, allowonlyloggedinuserreview } = require('../authmiddleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const Joi=require('joi');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchasync = require('../utils/catchAsync');

router.post('/',isloggedin,  catchasync(reviews.createReview))
// isloggedin,reviewvalidate,
router.delete('/:reviewId',isloggedin,allowonlyloggedinuserreview,   catchasync(reviews.deleteReview))
// allowonlyloggedinuserreview,, isloggedin

module.exports = router;


// const express=require('express')
// // mergeParams:true since we doesnt have campgrounds/:id in this page soit will show error as ( (Cannot read properties of null (reading 'reviews') ) so to avoid it use mergeParams:true
// const router=express.Router({mergeParams:true});
// const expresserror=require('../utils/expresserror')
// const catchasync=require('../utils/catchasync')
// const Campground = require('../models/campground');
// const Review=require('../models/review')
// const Joi=require('joi');

// const {isloggedin,reviewvalidate,allowonlyloggedinuserreview}=require("../authmiddleware")



// router.post('/',reviewvalidate,catchasync(async(req,res)=>{
//     const campground=await Campground.findById(req.params.id);
//     // since we named review form input as review[rating]
//     const review=new Review(req.body.review);
//     review.author = req.user._id;
//     console.log("review author="+review.author)
//     console.log("reqrev author="+req.user)
//     campground.reviews.push(review);
//     await review.save();
//     await campground.save();
//     req.flash('success','new review added')
//     res.redirect(`/campgrounds/${campground._id}`)
//     }))
    
//     router.delete('/:reviewid', catchasync(async(req,res,next)=>{
//         const {id,reviewid}=req.params;
//         const review=await Review.findById(reviewid)
       
//         // console.log(req.user._id)
//         // console.log(review.author)
//       // or const campgrounds=await Campground.findById(req.params.id); no need of(const {id}=req.params;)
    
       

    
//     //  if(review.author.equals(req.user)){console.log("hi")}
//     //    req.flash('error',"You are not allowed to perform this action")
//     //   return res.redirect(`/campgrounds/${id}`);
//     // }
   
//     await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
//     await Review.findByIdAndDelete(reviewid);
//     req.flash('success','Review deleted')
//     res.redirect(`/campgrounds/${id}`)
    
//     })) 


// module.exports=router;




































