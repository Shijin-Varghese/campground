//  campgroundSchema is schema for joi and not for model of mongoose
// destructure campgroundSchema as it has many item else it will be treated ad object instead of fn and throw error
const {campgroundSchema,reviewSchema}=require('./joischema/campgroundjoischema.js')
const Campground = require('./models/campground');
const Review = require('./models/review');
const expresserror=require('./utils/expresserror');
module.exports.isloggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl
      req.flash('error', 'You must be signed in first!');
      return res.redirect('/login');
  }
  next()
}


module.exports.campgroundvalidate=(req,res,next)=>{
    const {error}=campgroundSchema.validate(req.body)
    if(error){
      const msg=error.details.map((el)=>{return el.message}).join(',');
      throw new expresserror(msg,400)
    }
    else{
      next()
    }
}


module.exports.reviewvalidate=(req,res,next)=>{
    
  const {error}=reviewSchema.validate(req.body)
  if(error){
    const msg=error.details.map((el)=>{return el.message}).join(',');
    throw new expresserror(msg,400)
  }
  else{
    next()
  }
}

module.exports.allowonlyloggedinuser=async(req,res,next)=>{
  const {id}=req.params;
  const camp=await Campground.findById(id);
  if(!camp.author.equals(req.user._id)){
        req.flash('error',"You are not allowed")
      return  res.redirect(`/campgrounds/${id}`)
  }
  next();
   
  }


  module.exports.allowonlyloggedinuserreview=async(req,res,next)=>{
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
   
    }





module.exports.checkReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = 'req.session.returnTo';
    }
    next();
}
