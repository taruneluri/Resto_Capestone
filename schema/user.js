const mongoose=require('mongoose');
var schema=mongoose.Schema;
var user=new schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        require:true
    },
    adress:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    gender:{
        type:String,
    }
})
module.exports=mongoose.model('User',user);