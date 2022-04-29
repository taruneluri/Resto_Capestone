const express=require('express');
const router=express.Router();
const path=require('path');
router.use(express.static('resto'));
router.use(express.json());
router.use(express.urlencoded({extended:false}));
//mongodb requirement
const mongoose=require('./mongodb');
//schema requirement
const Manager=require('../schema/manager');
const Menu=require('../schema/menu');
const { route } = require('./home');
const menu = require('../schema/menu');
const { append } = require('express/lib/response');
const Order=require('../schema/order');
const Rev=require('../schema/rating');
//local variables

var manager_info;
var added_menu;
var orders_recieved;
var ratingsinfo;
router.post('/mregister',(req,res)=>{
    var a=req.body.name;
    var b=req.body.email;
    var c=req.body.mobile;
    var d=req.body.rname;
    var e=req.body.adress;
    var f=req.body.password;
    var g=req.body.cpswd;
    if(f==g)
    {
        Manager.findOne({email:b},(err,result)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                if(result==null)
                {
                    Manager.create({
                        name:a,
                        email:b,
                        mobile:c,
                        rname:d,
                        adress:e,
                        password:f
                    },(err)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            Manager.findOne({email:b,password:f},(err,result)=>{
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {
                                    manager_info=result;
                                    res.send("true");
                                    
                                }
                            })
                        }
                    })
                }
                else
                {
                    res.send("invalid");
                    
                }
            }
        })
    }
    else
    {
        res.send("notsame");
    }
});
router.post('/mlogin',(req,res)=>{
    var a=req.body.email;
    var b=req.body.password;
    Manager.findOne({email:a,password:b},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(result==null)
            {
                res.send('invalid');
            }
            else
            {
                manager_info=result;
                res.send('true');
            }
        }
    })
})
router.get('/profile',(req,res)=>{
    res.send(manager_info.name);
})
router.post('/addmenu',(req,res)=>{
    var a=req.body.rname;
    var b=req.body.rprice;
    var c=req.body.rdesc;
    Menu.findOne({name:a},(err,result)=>{
        if(err)
        {
            console.log(err);
            res.redirect('/addmenu');
        }
        else
        {
            if(result==null)
            {
                Menu.create({
                    email:manager_info.email,
                    name:a,
                    price:b,
                    desc:c
                },(err)=>{
                    if(err)
                    {
                        console.log(err);
                        
                    }
                    else
                    {
                        res.redirect('/addmenu');
                    }
                })
            }
            else
            {
                res.redirect('/addmenu');
            }
        }
    })
});
router.get('/viewaddedmenu',(req,res)=>{
    Menu.find({email:manager_info.email},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            added_menu=result;
            res.send(result);
        }
    })
});
router.get('/deletemenu/:id',(req,res)=>{
    var id=req.params.id;
    Menu.deleteOne(added_menu[id],function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect('/addmenu');
        }
    })
});
router.get('/getorders',(req,res)=>{
    Order.find({rmail:manager_info.email},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            orders_recieved=result;
            res.send(result);
        }
    })
});
router.get('/doneorder/:id',(req,res)=>{
    var id=req.params.id;
    Order.deleteOne(orders_recieved[id],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect('/morders');
        }
    })
})
router.get('/mgetratings',(req,res)=>{
    Rev.find({rmail:manager_info.email},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            ratingsinfo=result;
            res.send(result);     
        }
    })
})
router.get('/delrev/:id',(req,res)=>{
    var id=req.params.id;
    Rev.deleteOne(ratingsinfo[id],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect('/mrating');
        }
    })
})
module.exports=router;