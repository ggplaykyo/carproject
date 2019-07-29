var express = require('express');
var mysql = require('mysql');
var dbconfig = require('./dbconfig')

// var connection = mysql.createConnection(dbconfig);

var dbpool = mysql.createPool(dbconfig);


var router = express.Router();
router.get('/test', function (req, res) {
    console.log('/mysql/test');
    dbpool.getConnection((err, conn) => {
        conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            conn.release();
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
            res.json(results);
        });
    })
});

router.get('/getuser', function (req, res) {
    console.log('/mysql/getuser');
    dbpool.getConnection((err, conn) => {
        conn.query('SELECT * FROM user', function (error, results, fields) {
            if (error) throw error;
            conn.release();
            console.log('result : ', results);
            res.json(results);

        });
    })
});

router.get('/adduser', function (req, res) {
    console.log('/mysql/adduser');

    dbpool.getConnection((err, conn) => {
        const query = `INSERT INTO user (name, password, email) VALUES ("4", "123", "4@naver.com")`;

        conn.query(query, function (error, results, fields) {
            if (error) throw error;
            conn.release();
            console.log('result : ', results);
            res.json(results);

        });
    })
});

router.post('/adduser2', function (req, res) {
    console.log(req.body);
    dbpool.getConnection((err, conn) => {

        let name = req.body.name;
        let password = req.body.password;
        let email = req.body.email;

        const stmt = `INSERT INTO user (name,email,password) VALUES (?, ?, ?)`;
        conn.query(stmt, [name, email, password], function (error, results, fields) {
            if (error) throw error;
            conn.release();

            console.log('results : ', results);
            res.json(results);

        });
    })
});

router.get('/adduser_form', (req, res) => {
    res.render('register.html');
});

router.post('/loginuser', function (req, res) {
    dbpool.getConnection((err, conn) => {
        let email = req.body.email;
        let password = req.body.password;
        console.log(req.body);

        const logindata = `SELECT email, password FROM user WHERE email = ? and password = ?`;
        console.log(logindata);

        conn.query(logindata, [email, password], function (error, results, fields) {
            if (error) throw error;
            conn.release();
            if (results == "") {
                console.log('로그인 실패');
            } else {
                console.log('로그인 성공');
                res.redirect('/');
            }

        });
    })
});

router.get('/loginuser_form', (req, res) => {
    res.render('login.html');
});

module.exports = router;