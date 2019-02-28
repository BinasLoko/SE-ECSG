const express = require('express');
const router = express.Router();
const mysql = require('mysql');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'expertsystemdb'
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}


router.get('/', (req, res) => {
    /* 
        I'm using using "../" here because I'm accessing
        the views folder from this home_controller.js file folder.
     */
    res.render('../views/home.ejs');
});

router.get('/home', (req, res) =>
    res.render('../views/home.ejs'));


router.get('/about', (req, res) =>
    res.render('../views/about.ejs'));

router.get('/register', (req, res) =>
    res.render('../views/register.ejs'));

router.post('/register', (req, res) => {
    const body_values = req.body;

    execSQLQuery('INSERT INTO pessoas SET ?', body_values, (err, res) => {
        if (err) throw err;
        console.log('Last insert ID:', res.insertId);
    });




});


router.get('/login', (req, res) =>
    res.render('../views/login.ejs'));

module.exports = router;

router.get('/list', (req, res) => {
    execSQLQuery('select * from pessoas', res);
})

