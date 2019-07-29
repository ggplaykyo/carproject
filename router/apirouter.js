const express = require('express');
let router = express.Router();
const fs = require('fs');


router.get('/carlist', (req,res)=>{
    console.log("/api/carlist 요청 받음");

    res.json({carlist:carlist});
});

router.get('/regcar', (req, res) => {
    console.log("/regcar 요청 받음");
    res.render('car_register.html');
 });
 


module.exports = router;