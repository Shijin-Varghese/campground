const mongoose=require('mongoose');
const Campground = require('../models/campground');
const{descriptors,places}=require('./seedHelpers');
const cities= require('./cities');
mongoose.connect('mongodb://localhost:27017/yelpcamp', {useNewUrlParser:true, useCreateIndex:true,
useFindAndModify:true,useUnifiedTopology:true})
.then(()=>console.log("mongo connection open"))
.catch((err)=>console.log(err))

let sample=(array)=>{

    let a=array.length

    return array[Math.floor(Math.random()*a)];
}
const seeddb=async ()=>{
    for (let i = 0; i < 10; i++) {
       
        const price = Math.floor(Math.random() * 20) + 10;
        
        const camp = new Campground({
            //YOUR USER ID
            author: '63441ad03ff3fab0f2dcb19c',
            location: `${cities[i].city}, ${cities[i].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[i].longitude,
                    cities[i].latitude,

                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ],
            reviews:'6375e68f5004da0c8c88f648'

        })
        await camp.save();
    }

}
   
seeddb()



