const mongoose=require('mongoose');
var Schema=mongoose.Schema;
const cart=new Schema({
    umail:{
        type:String
    },
    rmail:{
        type:String
    },
    iname:{
        type:String
    },
    iprice:{
        type:Number
    }
});
module.exports=mongoose.model('Cart',cart);