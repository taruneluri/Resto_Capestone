//requirement of packages 
const express=require('express');
const mongoose=require('mongoose');
//requiring routers
const indexpage=require('./controller/home');
const customerjs=require('./controller/customer');
const managerjs=require('./controller/manager');
const admin=require('./controller/admin');
const app=express();
app.use(express.static('resto'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//requiring rest api
app.get('/',indexpage);
app.get('/login',indexpage);
app.get('/register',indexpage);
app.get('/m',indexpage);
app.get('/mlogin',indexpage);
app.get('/mregister',indexpage);
app.get('/mdashboard',indexpage);
app.get('/addmenu',indexpage);
app.get('/dashboard',indexpage);
app.get('/menupage',indexpage);
app.get('/cart',indexpage);
app.get('/morders',indexpage);
app.get('/orders',indexpage);
app.get('/ratings',indexpage);
app.get('/mrating',indexpage);
app.get('/logout',indexpage);
app.get('/mlogout',indexpage);
app.get('/admin',indexpage);
app.get('/adminlogin',indexpage);
app.get('/addhomepageinfo',indexpage);
app.get('/adminreg',indexpage);
//user
app.post('/register',customerjs);
app.post('/login',customerjs);
app.post('/findlocation',customerjs);
app.get('/locationresults',customerjs);
app.get('/view/:id',customerjs);
app.get('/viewmenu',customerjs);
app.get('/addtocart/:id',customerjs);
app.get('/cartinfo',customerjs);
app.get('/removefromcart/:id',customerjs);
app.post('/placeorder',customerjs);
app.get('/fetchuorders',customerjs);
app.get('/cartcount',customerjs);
app.post('/giverating',customerjs);
app.get('/userprofile',customerjs);
//manager
app.post('/mlogin',managerjs);
app.post('/mregister',managerjs);
app.get('/profile',managerjs);
app.post('/addmenu',managerjs);
app.get('/viewaddedmenu',managerjs);
app.get('/deletemenu/:id',managerjs);
app.get('/getorders',managerjs);
app.get('/doneorder/:id',managerjs);
app.get('/mgetratings',managerjs);
app.get('/delrev/:id',managerjs);
//admin
app.get('/usercount',admin);
app.get('/mancount',admin);
app.get('/menucount',admin);
app.get('/ordercount',admin);
app.post('/adminlogin',admin);
app.post('/adminreg',admin);
app.post('/sda',admin);
app.post('/sdb',admin);
app.post('/hca',admin);
//creating server
app.listen(3000,()=>{console.log("server started")});
