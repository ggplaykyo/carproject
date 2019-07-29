const express = require('express');
let router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    console.log("/ 요청 받음");
    res.render('index.html')
 });

 router.get('/regcarform', (req, res) => {
    console.log("/regcarform 요청 받음");
    res.render('car_register.html')
 });

 router.get('/regcar', (req, res) => {
    console.log("/regcar 요청 받음");
    console.log(req.query);
    carlist.push(req.query);
    fs.writeFileSync('./data/carlist.json', JSON.stringify(carlist, null, 8));
    res.redirect('/regcarform');
 });
 
 router.get('/profileform', (req, res) => {
    console.log("/profileform 요청 받음");
    res.render('profile.html');
 });
 
 router.get('/logout', (req, res) => {
    console.log("/logout 요청 받음");
    req.session.destroy();
    res.redirect('/');
 });
 
 router.get('/loginform', (req, res) => {
    console.log("/loginform 요청 받음");
    res.render('login.html');
 });
 
 router.get('/registerform', (req, res) => {
    console.log("/registerform 요청 받음");
 
    res.render('register.html');
 });
 
 router.get('/carlist', (req, res) => {
    console.log("/carlist 요청 받음");
    res.render('carlist.html')
 });
 
 router.post('/login', (req, res) => {
    console.log("/login 요청 받음");
    let loginfo = {};
    loginfo.email = req.body.email;
    loginfo.password = req.body.password;
 
    if(userlist[loginfo.email]){
       if(userlist[loginfo.email].password==loginfo.password){
          req.session.name = userlist[loginfo.email].name;
          req.session.email = loginfo.email;         
 
          res.redirect('/');
          return;
       }
    }
    res.redirect('/loginform');
  
 });
 
 router.post('/register', (req, res) => {
    console.log("/register 요청 받음");
    let userinfo = {};
    userinfo.name = req.body.name;
    userinfo.email = req.body.email;
    userinfo.password = req.body.password;
    console.log();
 
    if(!userlist[userinfo.email]){
       userlist[userinfo.email] = userinfo;
       fs.writeFileSync('./data/userlist.json', JSON.stringify(userlist,null,8));
       res.redirect('/loginform');
       return;
    }
 
    res.redirect('/registerform');
 });

 module.exports = router;