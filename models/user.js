const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const passportLocalMongoose=require('passport-local-mongoose')

const UserSchema=new Schema({
    email:{
       type:String,
       required:true, 
       unique:true
    }
})
// UserSchema.plugin(passportLocalMongoose) will add username and password to our UserSchema and also give some extra methods
UserSchema.plugin(passportLocalMongoose)

module.exports=mongoose.model('User',UserSchema)