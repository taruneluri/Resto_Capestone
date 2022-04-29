const mongoose=require('mongoose');
var Schema=mongoose.Schema;
const sr=new Schema({
    namea:{
        type:String,
        required:true
    },
    nameb:{
        type:String,
        required:true
    },
    namec:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('sr',sr);