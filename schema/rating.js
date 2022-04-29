const mongoose=require('mongoose');
var Schema=mongoose.Schema;
const rev=new Schema({
    uname:{
        type:String
    },
    rmail:{
        type:String
    },
    rating:{
        type:Number
    },
    review:{
        type:String
    }
});
module.exports=mongoose.model('Rev',rev);