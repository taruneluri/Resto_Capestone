const mongoose=require('mongoose');
var Schema=mongoose.Schema;
const sda=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String
    }
});
module.exports=mongoose.model('Sda',sda);