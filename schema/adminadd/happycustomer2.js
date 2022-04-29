const mongoose=require('mongoose');
var Schema=mongoose.Schema;
const hcb=new Schema({
    name:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    desc:{
        type:String
    }
});
module.exports=mongoose.model('Hcb',hcb);