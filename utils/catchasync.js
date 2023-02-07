// its just to avoid try and catch in every async fn inside app.js
module.exports=function catchasync(fn){
    return function(req,res,next){
        fn(req,res,next).catch((e)=>next(e))
    }
}