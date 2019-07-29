var express = require('express');
var mysql = require('mysql');
var dbconfig = require('./dbconfig')

var router = express.Router();

var connection = mysql.createConnection(dbconfig);

router.get('/test', function (req, res) {
    console.log('/mysql/test');

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;

        console.log('The solution is: ', results[0].solution);
        res.json(results);

    });
});

router.get('/getuser', function (req, res) {
    console.log('/mysql/getuser');

    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;

        console.log('result : ', results);
        res.json(results);

    });
});

router.get('/adduser', function (req, res) {
    console.log('/mysql/adduser');

    const query = `INSERT INTO user (name, password, email) VALUES ("4", "123", "4@naver.com")`;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;

        console.log('result : ', results);
        res.json(results);

    });
});

router.post('/adduser2', function (req, res) {
    console.log(req.body);

    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;

    const stmt = `INSERT INTO user (name,email,password) VALUES (?, ?, ?)`;
    connection.query(stmt, [name, email, password], function (error, results, fields) {
        if (error) throw error;

        console.log('results : ', results);
        res.json(results);

    });
});

router.get('/adduser_form', (req, res) => {
    res.render('register.html');
});

router.post('/loginuser', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body);

    const logindata = `SELECT email, password FROM user WHERE email = ? and password = ?`;
    console.log(logindata);

    connection.query(logindata, [email, password], function (error, results, fields) {
        if (error) throw error;  
        if (results == "") {
            console.log('로그인 실패');
        } else {
            console.log('로그인 성공');
            res.json(results);
        }

    });
});

router.get('/loginuser_form', (req, res) => {
    res.render('login.html');
});

module.exports = router;