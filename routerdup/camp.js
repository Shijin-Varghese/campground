const express=require('express');
const router=express.Router();
const catchasync=require('../utils/catchasync')

const Campground = require('../models/campground');
const Joi=require('joi');
const {isloggedin,allowonlyloggedinuser,campgroundvalidate}=require("../authmiddleware")

router.get('/',catchasync(async (req,res)=>{
    const campgrounds=await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
    }))
    
    router.get('/new',isloggedin,catchasync(async (req,res)=>{
        
        res.render('campgrounds/new',)
        }))
       //     basically, the id getter returns a string representation of the document's _id (which is added to all MongoDB documents by default and have a default type of ObjectId).
    
    // Regarding what's better for referencing, that depends entirely on the context (i.e., do you want an ObjectId or a string). For example, if comparing id's, the string is probably better, as ObjectId's won't pass an equality test unless they are the same instance (regardless of what value they represent)
    
    // probably._id is used for url and .id for referencing  
    router.post('/',isloggedin,catchasync(async (req,res,next)=>{
       
       const campground=new Campground(req.body.campground);
       campground.author=req.user._id;
      //  req.user is from passport here we are doing campground,author as campground=new Campground
       
            await campground.save()
            // we have used success in every flash message in this project it can be any key name and generally we need only 1 flash key
            req.flash('success',"New Campground created successfully")
                 res.redirect(`/campgrounds/${campground._id}`)
        
            }))
    
    router.get('/:id',catchasync(async (req,res)=>{
        const {id}=req.params;
        
        

         // or const campgrounds=await Campground.findById(req.params.id); no need of(const {id}=req.params;)
        const campgrounds=await Campground.findById(id).populate({path:'reviews',populate:{
          path:'author'
        }}).populate('author');
        console.log("req.user="+req.user._id)
        console.log("campgrounds.author="+campgrounds.author._id)
        console.log(campgrounds.author._id==req.user._id)
        if(!campgrounds){
          req.flash('error','cannot find campground')
         return res.redirect('/campgrounds')
        }
        res.render('campgrounds/show',{campgrounds})
        }))
    
      router.get('/:id/edit',allowonlyloggedinuser,catchasync(async (req,res)=>{
          const{id}= req.params
          
         const campground=await Campground.findById(req.params.id);

           
            res.render('campgrounds/edit',{campground})
            }))
    
         router.put("/:id",catchasync(async(req,res)=>{
       
               const{id}= req.params
              
            const campground=   await Campground.findByIdAndUpdate(id,{...req.body.campground})
            req.flash('success','Successfully updated campground')
            res.redirect(`/campgrounds/${campground._id}`)
    
                // in edit.js we gave name as campground[title] so we can refer it like req.body.campground
            }))
    router.delete('/:id',catchasync(async(req,res)=>{
      const{id}= req.params
      
        await Campground.findByIdAndDelete(id);
        req.flash('success','Review deleted')
        res.redirect('/campgrounds')
    
    }))

    module.exports=router;