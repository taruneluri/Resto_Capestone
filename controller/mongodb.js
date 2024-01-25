const mongoose=require('mongoose');
const uri = "mongodb+srv://taruneluri:taruneluri@cluster0.gkezw.mongodb.net/resto?retryWrites=true&w=majority";

const url= "mongodb+srv://srinija:Srinija123@cluster0.1gthf.mongodb.net/resto?retryWrites=true&w=majority";
mongoose.connect(url).then(()=>{console.log("DataBase Connected !!")});
module.exports=mongoose;