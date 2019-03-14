const express = require('express');
const router = express.Router();
const mysql = require('mysql');


function execSQLQuery(sqlQry, queryValues) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'expertsystemdb'
    });
    return new Promise((resolve, reject) => {
        connection.query(sqlQry, queryValues, function (error, results, fields) {

            connection.end();
            if (error) return reject(error);
            resolve(results);
        });
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

router.get('/gameform', (req, res) =>
    res.render('../views/gameform.ejs'));

router.get('/heuristicform', (req, res) =>
    res.render('../views/heuristicform.ejs'));

router.get('/about', (req, res) =>
    res.render('../views/about.ejs'));

router.get('/register', (req, res) =>
    res.render('../views/register.ejs'));

router.get('/gamepanel', (req, res) =>
    res.render('../views/gamepanel.ejs'));

router.post('/heuristicform', (req, res) => {
   /* const body_values = req.body;
    console.log(body_values)*/
})

router.post('/register', (req, res) => {
    const body_values = req.body;
    console.log(body_values);

    let query = `INSERT INTO pessoas 
        (   
            nome, 
            sobrenome, 
            pais_residencia, 
            sexo,
            telefone, 
            data_nascimento, 
            nome_usuario, 
            senha_usuario, 
            email_usuario
        ) 
        VALUES
        (
            ?,?,?,?,?,?,?,?,?
        )`;

    var teste = body_values.nome;
    let form_values = [
        body_values.nome,
        body_values.sobrenome,
        body_values.pais,
        body_values.sexo,
        body_values.telefone,
        body_values.nascimento,
        body_values.username,
        body_values.password,
        body_values.email
    ]

    execSQLQuery(query, form_values)
        .then(dbResponse => {
            res.redirect('/login');
        })
        .catch(error => {
            res.json('fuck');
        });

    //todo
    //se der erro, botar as infos no localstorage e atribuir 
    //botar maxlength nos campos
});


router.get('/login', (req, res) =>
    res.render('../views/login.ejs'));

module.exports = router;

router.get('/list', async (req, res) => {
    const dbResponse = await execSQLQuery('select * from pessoas');
    res.json(dbResponse);
})

router.post('/login', (req, res) => {
    const user = req.body;
    const username = req.body.username;
    const password = req.body.password;

    let query = `
            SELECT * 
            FROM pessoas
            WHERE nome_usuario = ? 
            AND senha_usuario = ?`;

    let form_values = [username, password];

    if (username && password) {
        execSQLQuery(query, form_values)
            .then(dbResponse => {
                res.redirect('/home');
            })
            .catch(error => {
                res.json('fuck');
            });
    }

    form_values.password = undefined;



});