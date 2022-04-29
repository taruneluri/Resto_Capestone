const mongoose=require('mongoose');
var Schema=mongoose.Schema;
const order=new Schema({
    umail:{
        type:String
    },
    uname:{
        type:String
    },
    uno:{
        type:String
    },
    rmail:{
        type:String
    },
    uadd:{
        type:String
    },
    iname:{
        type:String
    },
    iprice:{
        type:Number
    }

});
module.exports=mongoose.model('Order',order);