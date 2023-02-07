const mongoose=require('mongoose');

const Schema=mongoose.Schema;
// same as {schema}=mongoose;
const Review=require('./review')
const ImageSchema=new Schema({
        url:String,
        filename:String
})
// we are taking ImageSchema as seperate schema because we want to use virtual on it
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload','/upload/w_200')
})

const CampgroundSchema=new Schema({
         title:String,
         images:[
            ImageSchema
         ],
         price:Number,
         description:String,
         geometry: {
          type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
          //  required:true
          },
          coordinates: {
            type: [Number], //   array of numbers
            // required: true
          }
        },
         location:String,
         author:{
            type:Schema.Types.ObjectId,
            ref:'User'
         },
         reviews:[
            {
                type:Schema.Types.ObjectId , ref:'Review' 
            }
         ]
});
// probably instead of docs it should have been query as findOneAndDelete is query middleware NOTE:findByIdAndDelete triggers findOneAndDelete middleware
CampgroundSchema.post('findOneAndDelete',async(docs)=>{
    if(docs){
        await Review.remove({_id:{
            $in: docs.reviews
        }})
    }
})
module.exports=mongoose.model('Campground',CampgroundSchema);

