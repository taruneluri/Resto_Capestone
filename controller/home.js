const express=require('express');
const { append } = require('express/lib/response');
const router=express.Router();
const path=require('path');
const session=require('express-session');
router.use(session({secret:"123"}))
router.use(express.static('resto'));
router.use(express.json());
router.use(express.urlencoded({extended:false}));

router.route('/',(req,res)=>{
    req.session.visited=false;
    res.sendFile(path.resolve('resto/index.html'));
    
});
router.get('/login',(req,res)=>{
    req.session.visited=false;
    res.sendFile(path.resolve('resto/login.html'));
});
router.get("/register",(req,res)=>{
    req.session.visited=false;
    res.sendFile(path.resolve('resto/register.html'));
});
router.get('/m',(req,res)=>{
    req.session.visited=false;
    res.sendFile(path.resolve('resto/mindex.html'));
});
router.get('/mlogin',(req,res)=>{
    req.session.visited=false;
    res.sendFile(path.resolve('resto/mlogin.html'));
});
router.get('/mregister',(req,res)=>{
    req.session.visited=false;
    res.sendFile(path.resolve('resto/mregister.html'));
});
router.get('/mdashboard',(req,res)=>{
    req.session.visited=true;
    res.sendFile(path.resolve('resto/mdashboard.html'));
});
router.get('/addmenu',(req,res)=>{
    if(req.session.visited==true)
    {
        res.sendFile(path.resolve('resto/addmenu.html'));
    }
    else
    {
        res.sendFile(path.resolve('resto/mlogin.html'));
    }
    
});
router.get('/dashboard',(req,res)=>{
    req.session.visited=true;
    res.sendFile(path.resolve('resto/dashboard.html'));
});
router.get('/menupage',(req,res)=>{
    if(req.session.visited==true)
    {
        res.sendFile(path.resolve('resto/viewmenu.html'));
    }
    else
    {
        res.sendFile(path.resolve('resto/login.html'));
    }

});
router.get('/cart',(req,res)=>{
    if(req.session.visited==true)
    {
        res.sendFile(path.resolve('resto/cart.html'));
    }
    else
    {
        res.sendFile(path.resolve('resto/login.html'));
    }
    
});
router.get('/morders',(req,res)=>{
    if(req.session.visited==true)
    {
        res.sendFile(path.resolve('resto/morders.html'));
    }
    else
    {
        res.sendFile(path.resolve('resto/mlogin.html'));
    }
    
    
});
router.get('/orders',(req,res)=>{
    if(req.session.visited==true)
    {
        res.sendFile(path.resolve('resto/orders.html'));
    }
    else
    {
        res.sendFile(path.resolve('resto/login.html'));
    }
    
});
router.get('/ratings',(req,res)=>{
    if(req.session.visited==true)
    {
        res.sendFile(path.resolve('resto/rating.html'));
    }
    else
    {
        res.sendFile(path.resolve('resto/login.html'));
    }
    
});
router.get('/mrating',(req,res)=>{
    if(req.session.visited==true)
    {
        res.sendFile(path.resolve('resto/mrating.html'));
    }
    else
    {
        res.sendFile(path.resolve('resto/mlogin.html'));
    }
    
});
router.get('/logout',(req,res)=>{
    req.session.visited=false;
    res.redirect('/');
})
router.get('/mlogout',(req,res)=>{
    req.session.visited=false;
    res.redirect('/m');
});
router.get('/admin',(req,res)=>{
    res.sendFile(path.resolve('resto/admin/index.html'));
});
router.get('/adminlogin',(req,res)=>{
    res.sendFile(path.resolve('resto/signin.html'));
});
router.get('/addhomepageinfo',(req,res)=>{
    res.sendFile(path.resolve('resto/widget.html'));
});
router.get('/adminreg',(req,res)=>{
    res.sendFile(path.resolve('resto/signup.html'));
})
module.exports=router;