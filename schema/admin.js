const mongoose=require('mongoose');
var schema=mongoose.Schema;
var admin=new schema({
    id:{
        type:String,

    },
    pswd:{
        type:String,
        
    },
    name:{
        type:String,
    
    }
})
module.exports=mongoose.model('Admin',admin);