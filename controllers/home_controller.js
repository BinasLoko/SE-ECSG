const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const querystring = require('querystring');


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

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
    } else {
        next();
    }
}

const redirectGamePanel = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/gamepanel')
    } else {
        next();
    }
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

router.get('/gameform', redirectLogin, (req, res) =>
    res.render('../views/gameform.ejs'));

router.get('/heuristicform', redirectLogin, (req, res) => {

    console.log(req.query.codsg);

    req.session.cod_sg = req.query.codsg;

    res.render('../views/heuristicform.ejs');
    
});


router.get('/formsuccess', redirectLogin, (req, res) =>
    res.render('../views/formsuccess.ejs'));

router.get('/about', (req, res) =>
    res.render('../views/about.ejs'));

router.get('/register', redirectGamePanel, (req, res) =>
    res.render('../views/register.ejs'));

router.get('/gamepanel', redirectLogin, (req, res) => {

    let query = `
            SELECT * 
            FROM serious_game
            WHERE cod_pessoa = ?`;

    let form_values = [req.session.userId];

    let games = [];

    execSQLQuery(query, form_values)
        .then(dbResponse => {
            if (dbResponse != "") {
                for (let i = 0; i < dbResponse.length; i++) {
                    games.push({
                        name: dbResponse[i].nome_sg,
                        evaluation: dbResponse[i].heuristic_status,
                        cod_sg: dbResponse[i].cod_sg
                    });
                }
                res.render('../views/gamepanel.ejs', { games });
            } else {
                res.render('../views/gamepanel.ejs', { games });
            }
        })
        .catch(error => {
            res.redirect('/home');
        });


    /*const games = [{
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
    }];*/

});

router.post('/heuristicform', (req, res) => {
    const body_values = req.body;
    let json_values = JSON.stringify(body_values);
    let cod_sg_value = req.session.cod_sg;

    let query = `INSERT INTO formulario(cod_sg, heuristic_responses)
                VALUES(?,?)`;

    let values = [cod_sg_value, json_values];

    let update_query = `UPDATE serious_game
                        set heuristic_status = "S"
                        WHERE cod_sg = ?`
    let update_value = [cod_sg_value];


    execSQLQuery(query, values)
        .then(dbResponse => {
            execSQLQuery(update_query, update_value)
                .then(dbResponse => {
                    
                    res.redirect('/devreport');
                })            
        })
        .catch(error => {
            res.redirect('/gamepanel');

            var popup = require('popups');

            popup.alert({
                content: 'Algo deu errado com o envio do formulário de heurísticas, tente novamente!'
            });
        });
})

router.post('/register', redirectGamePanel, (req, res) => {
    const body_values = req.body;

    let insertQuery = `INSERT INTO pessoas 
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

    let selectQuery = `
            SELECT * 
            FROM pessoas
            WHERE nome_usuario = ? 
            AND email_usuario = ?`;

    let form_select_values = [body_values.username, body_values.email];

    execSQLQuery(selectQuery, form_select_values)
        .then(dbResponse => {
            if (dbResponse == "") {
                execSQLQuery(insertQuery, form_values)
                    .then(dbResponse => {
                        res.redirect('/login');
                    })
                    .catch(error => {
                        res.redirect('/register');
                    });
            }
            res.redirect('/login');
        })
        .catch(error => {
            res.redirect('/register');
        });
});


router.get('/login', redirectGamePanel, (req, res) =>
    res.render('../views/login.ejs'));

router.get('/devreport', redirectLogin, (req, res) => {
    //todo trocar o valor para o codigo do sg ao invés de 1. mockado para finalizar
    let cod_sg = 1;
    let heuristic_values = [];
    let selectQuery = `SELECT * 
                        FROM formulario
                        WHERE cod_sg = ?`

    let queryValues = [cod_sg];

    execSQLQuery(selectQuery, queryValues)
        .then(dbResponse => {
            heuristic_values = dbResponse[0].heuristic_responses;
            console.log(heuristic_values);
            res.render('../views/devreport.ejs', { 'heuristic_values': heuristic_values });
        })
        .catch(error => {
            console.log(error);
            console.log(req.session.userId);
            res.json('fuck');
        });

    req.session.cod_sg = null; 

    
});

module.exports = router;

router.get('/list', async (req, res) => {
    const dbResponse = await execSQLQuery('select * from pessoas');
    res.json(dbResponse);
})

router.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }

        res.clearCookie('ECSG_SESSION');
        res.redirect('/login');
    })
});

router.post('/login', redirectGamePanel, (req, res) => {
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
                req.session.userId = dbResponse[0].cod_pessoa;
                res.redirect('/gamepanel');
            } else { }
        })
        .catch(error => {
            res.redirect('/home');
        });


    form_values.password = undefined;



});

router.post('/gameform', (req, res) => {
    const game = req.body;
    let heuristic_status = "N";
    let query = `INSERT INTO serious_game 
        (   
            nome_sg, 
            genero_sg, 
            foco_sg, 
            heuristic_status, 
            descricao_sg,
            cod_pessoa
        ) 
        VALUES
        (
            ?,?,?,?,?,?
        )`;

    let form_values = [
        game.nome,
        game.genero,
        game.foco,
        heuristic_status,
        game.descricao,
        req.session.userId
    ]

    execSQLQuery(query, form_values)
        .then(dbResponse => {
            res.redirect('/gamepanel');
        })
        .catch(error => {
            console.log(error);
            console.log(req.session.userId);
            res.json('fuck');
        });


});