const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');
const session = require('express-session');




global.carlist = {};
global.userlist = {};

if(fs.existsSync('./data/userlist.json')){
   let user = fs.readFileSync('./data/userlist.json');
   userlist = JSON.parse(user);
   // console.log(userlist);
}
if(fs.existsSync('./data/carlist.json')){
   let car = fs.readFileSync('./data/carlist.json');
   carlist = JSON.parse(car);
}


// html 렌더링 설정
app.set('views', path.join(__dirname, '/html'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({
   extended: false // querystring 모듈 사용
}));
app.use(express.static(path.join(__dirname, '')));
app.use(session({
   secret: '1A@W#E$E',
   resave: false,
   saveUninitialized: true,
   // store: new FileStore(),
}));
app.use(function (req, res, next) {
   res.locals.user = {};
   res.locals.user.email = req.session.email;
   res.locals.user.name = req.session.name;
   next();
});

let index = require('./router/index.js');
app.use('/',index);

let api = require('./router/apirouter.js');
app.use('/api',api);

let mysqlrouter = require('./router/mysqlpool.js')
app.use('/mysql', mysqlrouter);

app.listen(port, () => {
   console.log('Server listening...' + port);
});