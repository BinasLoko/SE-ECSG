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

router.get('/heuristicreport', (req, res) =>
    res.render('../views/heuristicreport.ejs'));

router.get('/formsuccess', (req, res) =>
    res.render('../views/formsuccess.ejs'));

router.get('/about', (req, res) =>
    res.render('../views/about.ejs'));

router.get('/register', (req, res) =>
    res.render('../views/register.ejs'));

router.get('/gamepanel', (req, res) => {
    const games = [{
        name: "Jogo 1",
        avaliation: 0
    }, {
        name: "Jogo MAster",
        avaliation: 1
    }, {
        name: "Jogo Blaster",
        avaliation: 0
    }, {
        name: "Domino",
        avaliation: 2
    }, {
        name: "Rodrigo santoro",
        avaliation: 0
    }];
    res.render('../views/gamepanel.ejs', { games });
});

router.post('/heuristicform', (req, res) => {
    const body_values = req.body;

    let json_values = JSON.stringify(body_values);
    console.log(json_values);
    
    let query = `INSERT INTO formulario(heuristic_responses)
                VALUES(?)`;

    execSQLQuery(query, json_values)
        .then(dbResponse => {
            res.redirect('/devreport');
        })
        .catch(error => {
            res.redirect('/gamepanel');

            var popup = require('popups');

            popup.alert({
                content: 'Algo deu errado com o envio do formulário de heurísticas, tente novamente!'
            });
        });



    res.redirect('/formsuccess');
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

router.get('/devreport', (req, res) =>
    res.render('../views/devreport.ejs'));

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

    execSQLQuery(query, form_values)
        .then(dbResponse => {
            if (dbResponse != "") {
                console.log(dbResponse[0].cod_pessoa);
                res.redirect('/gamepanel');
            } else { }

        })
        .catch(error => {
            res.json('fuck');
        });


    form_values.password = undefined;



});

router.post('/gameform', (req, res) => {
    const game = req.body;

    let query = `INSERT INTO serious_game 
        (   
            nome_sg, 
            genero_sg, 
            foco_sg, 
            dt_lancamento_sg,
            plataforma_sg, 
            descricao_sg
        ) 
        VALUES
        (
            ?,?,?,?,?,?
        )`;

    let form_values = [
        body_values.nome,
        body_values.genero,
        body_values.foco,
        body_values.plataforma,
        body_values.lancamento,
        body_values.descricao
    ]

    execSQLQuery(query, form_values)
        .then(dbResponse => {
            res.redirect('/gamepanel');
        })
        .catch(error => {
            res.json('fuck');
        });


});