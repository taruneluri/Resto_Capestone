const express=require('express');
const router=express.Router();
const path=require('path');
router.use(express.static('resto'));
router.use(express.json());
router.use(express.urlencoded({extended:false}));
//mongodb requirement
const mongoose=require('./mongodb');
//schema requirement
const User=require('../schema/user');
const Manager=require('../schema/manager');
const Menu=require('../schema/menu');
const Cart=require('../schema/cart');
const Order=require('../schema/order');
const Rev=require('../schema/rating');
const { route } = require('./home');
const { append } = require('express/lib/response');
//local variable
var user_info;
var location;
var location_results;
var menu_email;
var menu_data;
var cart_info;
var ratingmail=[];
//routes
router.post('/register',(req,res)=>{
    var uname=req.body.username;
    var uemail=req.body.email;
    var umobile=req.body.mobile;
    var uadd=req.body.adress;
    var npswd=req.body.password;
    var cpswd=req.body.cpswd;
    if(npswd==cpswd)
    {
        User.findOne({mobile:umobile,email:uemail},(err,result)=>{
            if(err)
            {
                console.log(ree);
                res.redirect('/register');
            }
            else{
                if(result==null)
                {
                    User.create({
                        username:uname,
                        email:uemail,
                        mobile:umobile,
                        adress:uadd,
                        password:cpswd
                    },(err)=>{
                        if(err)
                        {
                            console.log(err);
                            res.redirect('/register');
                        }
                        else
                        {
                            User.findOne({email:uemail,password:cpswd},(err,result)=>{
                                if(err)
                                {
                                    console.log(err);
                                    res.redirect('/login');
                                }
                                else
                                {
                                    if(result==null)
                                    {
                                        res.redirect('/login');
                                    }
                                    else
                                    {
                                        user_info=result;
                                        res.send('true')
                                        
                                    }
                                }
                            })
                        }
                    })
                }
                else
                {
                    res.send('invalid');
                    
                }
            }
        })
    }
    else
    {
        res.send('notsame');
    }
});
router.post('/login',(req,res)=>{
    var uemail=req.body.email;
    var upswd=req.body.password;
    User.findOne({email:uemail,password:upswd},(err,result)=>{
        if(err)
        {
            console.log(err);
            res.redirect('/login');
        }
        else
        {
            if(result==null)
            {
                res.send("invalid");
            }
            else
            {
                user_info=result;
                res.send('true');
            }
        }
    })
});
router.post('/findlocation',(req,res)=>{
    location=req.body.loc;
    res.redirect('/dashboard');
})
router.get('/locationresults',(req,res)=>{
    Manager.find({adress:location},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            location_results=result;
            res.send(result);
        }
    })
});
router.get('/view/:id',(req,res)=>{
    var id=req.params.id;
    menu_email=location_results[id].email;
    res.redirect('/menupage');
});
router.get('/viewmenu',(req,res)=>{
    Menu.find({email:menu_email},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            menu_data=result;
            res.send(result);
        }
    });
    
});
router.get('/addtocart/:id',(req,res)=>{
    id=req.params.id;
    Cart.create({
        umail:user_info.email,
        rmail:menu_data[id].email,
        iname:menu_data[id].name,
        iprice:menu_data[id].price,
    },(err)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect('/menupage');
        }
    }) 
});
router.get('/cartcount',(req,res)=>{
    Cart.find({umail:user_info.email},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
})
router.get('/cartinfo',(req,res)=>{
    Cart.find({umail:user_info.email},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            cart_info=result;
            res.send(result);
        }
    })
});
router.get('/removefromcart/:id',(req,res)=>{
    var id=req.params.id;
    Cart.deleteOne(cart_info[id],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect('/cart');
        }
    })
});
router.post('/placeorder',(req,res)=>{
    var location=req.body.loc;
    for(var i=0;i<cart_info.length;i++)
    {
        ratingmail[i]=cart_info[i].rmail;
        Order.create({
            umail:user_info.email,
            uname:user_info.username,
            uno:user_info.mobile,
            uadd:location,
            rmail:cart_info[i].rmail,
            iname:cart_info[i].iname,
            iprice:cart_info[i].iprice,
        })
        Cart.deleteOne(cart_info[i],(err,result)=>{
            if(err)
            {
                console.log(err);
            }
        });
    }

    res.redirect('/orders');
});
router.get('/fetchuorders',(req,res)=>{
    Order.find({umail:user_info.email},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
});
router.post('/giverating',(req,res)=>{
    var a=req.body.rate;
    var b=req.body.review;
    for(i=0;i<ratingmail.length;i++)
    {
        Rev.create({
            uname:user_info.username,
            rmail:ratingmail[i],
            rating:a,
            review:b

        })
    }
    res.redirect('/dashboard');
});
router.get('/userprofile',(req,res)=>{
    res.send(user_info.username);
})
module.exports=router;
