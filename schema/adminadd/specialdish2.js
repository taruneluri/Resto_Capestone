const mongoose=require('mongoose');
var Schema=mongoose.Schema;
const sdb=new Schema({
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
module.exports=mongoose.model('Sdb',sdb);