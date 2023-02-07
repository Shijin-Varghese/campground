const Campground = require('../models/campground');
const {cloudinary}=require('../cloudinary')
// const axios=require('axios')

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    // multer give acces to req.files here we are mapping over created image and setting its url to f.path as req.files has path which give path to cloudinary .filename(used when we want to delete image) is also given by multer


    campground.images=req.files.map(f=>({url:f.path,filename:f.filename}))
  
    campground.author=req.user._id;
  console.log("helo"+campground.author)
    await campground.save();


    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req, res,) => {
    const campgrounds = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
 }).populate('author');
    if (!campgrounds) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');

    }
const a=campgrounds.geometry.coordinates[0];
const b=campgrounds.geometry.coordinates[1];
console.log(a);
console.log(b);
    res.render('campgrounds/show', { campgrounds,a,b });

}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    
    const campground = await Campground.findById(id)

    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    
   
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//    we are not adding campground.images=req.files.map(f=>({url:f.path,filename:f.filename}))   because it will give an array since we already have array of image (as we are editing images) it will cause error as in mongoose schema we have image as  array not array inside array
     const imgs=req.files.map(f=>({url:f.path,filename:f.filename}))
      // we are pushing because we dont want to overwrite image but to add it
    campground.images.push(...imgs)
    campground.save();

    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        // here we are taking campground instead of Campground beacause we want to edit campground on which we are right now
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}