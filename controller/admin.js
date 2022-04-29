const express=require('express');
const router=express.Router();
const path=require('path');
router.use(express.static('resto'));
router.use(express.json());
router.use(express.urlencoded({extended:false}));
var name;
//mongodb requirement
const mongoose=require('./mongodb');
//schema requirement
const User=require('../schema/user');
const Manager=require('../schema/manager');
const Menu=require('../schema/menu');
const Cart=require('../schema/cart');
const Order=require('../schema/order');
const Rev=require('../schema/rating');
const Admin=require('../schema/admin');
const { route } = require('./home');
const admin = require('../schema/admin');
const Sda=require('../schema/adminadd/specialdish1');
const Sdb=require('../schema/adminadd/specialdish2');
const Hca=require('../schema/adminadd/happycustomer1');
router.get('/usercount',(req,res)=>{
    User.find({},(err,result)=>{
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
router.get('/mancount',(req,res)=>{
    Manager.find({},(err,result)=>{
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
router.get('/menucount',(req,res)=>{
    Menu.find({},(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.send(result);
        }
    })
});
router.get('/ordercount',(req,res)=>{
  Order.find({},(err,result)=>{
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
router.post('/adminreg',(req,res)=>{
    var a=req.body.name;
    var b=req.body.id;
    var c=req.body.pswd;
    Admin.findOne({id:b,pswd:c,name:a},(err,result)=>{
        if(err)
        {
            console.log(err);
            res.redirect('/adminreg');
        }
        else
        {
            if(result==null)
            {
                Admin.create({
                    name:a,
                    id:b,
                    pswd:c
                },(err)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        name=a;
                        res.send('true');   
                    }
                })
            }
            else
            {
                res.send("invalid");
            }
        }
    })
})
router.post('/adminlogin',(req,res)=>{
    var a=req.body.id;
    var b=req.body.pswd;

    Admin.findOne({id:a,pswd:b},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(result==null)
            {
                res.send("invalid")
            }
            else{
                name=result.name;
                res.send('true');   
            }
        }
    })
});
router.post('/sdb',(req,res)=>{
    var a=req.body.name;
    var b=req.body.price;
    var c=req.body.desc;
    Sdb.findOne({},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(result == null)
            {
                Sdb.create({
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
                        res.send("true");
                    }
                })
            }
            else
            {
                Sdb.deleteOne({},(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        Sdb.create({
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
                                res.send("true");
                            }
                        })
                    }

                })
            }
        }
    })

});
router.post('/sda',(req,res)=>{
    var a=req.body.name;
    var b=req.body.price;
    var c=req.body.desc;
    Sda.findOne({},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(result == null)
            {
                Sda.create({
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
                        res.send("true");
                    }
                })
            }
            else
            {
                Sda.deleteOne({},(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        Sda.create({
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
                                res.send("true");
                            }
                        })
                    }

                })
            }
        }
    })

});
router.post('/hca',(req,res)=>{
    var a=req.body.name;
    var b=req.body.review;
    var c=req.body.desc;
    Hca.findOne({},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(result==null)
            {
                Hca.deleteOne({},(err)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        Hca.create({
                            
                        })
                    }
                })
            }
            else
            {

            }
        }
    })

})
module.exports=router;