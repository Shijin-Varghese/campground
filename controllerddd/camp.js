const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds=await Campground.find({});
        res.render('campgrounds/index',{campgrounds})
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}
//        //     basically, the id getter returns a string representation of the document's _id (which is added to all MongoDB documents by default and have a default type of ObjectId).
    
//     // Regarding what's better for referencing, that depends entirely on the context (i.e., do you want an ObjectId or a string). For example, if comparing id's, the string is probably better, as ObjectId's won't pass an equality test unless they are the same instance (regardless of what value they represent)
    
//     // probably._id is used for url and .id for referencing  
module.exports.createCampground = async (req, res, next) => {

    const campground=new Campground(req.body.campground);
      //  req.user is from passport here we are doing campground,author as campground=new Campground
       campground.author=req.user._id;
            await campground.save()
            // we have used success in every flash message in this project it can be any key name and generally we need only 1 flash key
            req.flash('success',"New Campground created successfully")
                 res.redirect(`/campgrounds/${campground._id}`)
        
}

module.exports.showCampground = async (req, res,) => {
    const {id}=req.params;
        //  or const campgrounds=await Campground.findById(req.params.id); no need of(const {id}=req.params;)
        const campgrounds=await Campground.findById(id).populate({path:'reviews',populate:{
          path:'author'
        }}).populate('author');
     
        if(!campgrounds){
          req.flash('error','cannot find campground')
         return res.redirect('/campgrounds')
        }
        res.render('campgrounds/show',{campgrounds})
}

module.exports.renderEditForm = async (req, res) => {
    const{id}= req.params
     const campground=await Campground.findById(req.params.id);
            if (!campground) {
                req.flash('error', 'Cannot find that campground!');
                return res.redirect('/campgrounds');
            }
           
            res.render('campgrounds/edit',{campground})
}

module.exports.updateCampground = async (req, res) => {
    const{id}= req.params
              
            const campground=   await Campground.findByIdAndUpdate(id,{...req.body.campground})
            req.flash('success','Successfully updated campground')
            res.redirect(`/campgrounds/${campground._id}`)
    
                // in edit.js we gave name as campground[title] so we can refer it like req.body.campground
}

module.exports.deleteCampground = async (req, res) => {
    const{id}= req.params
      
            await Campground.findByIdAndDelete(id);
            req.flash('success','Review deleted')
            res.redirect('/campgrounds')
}