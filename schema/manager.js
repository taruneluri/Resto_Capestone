const mongoose=require('mongoose');
var schema=mongoose.Schema;
var manager=new schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    rname:{
        type:String,
        required:true
    },
    adress:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Manager',manager);