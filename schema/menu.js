const mongoose=require('mongoose');
var schema=mongoose.Schema;
var menu=new schema({
    email:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Menu',menu);