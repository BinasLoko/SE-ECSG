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

router.get('/heuristicform', redirectLogin, (req, res) =>
    res.render('../views/heuristicform.ejs'));

router.get('/formsuccess', redirectLogin, (req, res) =>
    res.render('../views/formsuccess.ejs'));

router.get('/about', (req, res) =>
    res.render('../views/about.ejs'));

router.get('/register', redirectGamePanel, (req, res) =>
    res.render('../views/register.ejs'));

router.get('/gamepanel', redirectLogin, (req, res) => {

    let selectQuery = `
            SELECT * 
            FROM serious_game
            WHERE cod_pessoa = ?`;
    let form_select_values = [req.session.userId];

    execSQLQuery(selectQuery, form_select_values)
        .then(dbResponse => {
            if(dbResponse != ""){
                for (let i = 0; i <= dbResponse.length; i++) {
                    let games = [{
                        name: dbResponse[i].nome_sg,
                        evaluation: dbResponse[i].heuristic_status
                    }]
                }
                res.render('../views/gamepanel.ejs', { games });
            }else{
                res.render('../views/blankgamepanel.ejs');
            }            
            
        })
        .catch(error => {
            res.redirect('/login');
        });

});

router.post('/heuristicform', (req, res) => {
    const body_values = req.body;

    let json_values = JSON.stringify(body_values);

    let query = `INSERT INTO formulario(cod_sg, heuristic_responses)
                VALUES(?,?)`;

    let values = []

    execSQLQuery(query, values)
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

router.get('/devreport', redirectLogin, (req, res) =>
    res.render('../views/devreport.ejs'));

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

router.post('/gameform', redirectLogin, (req, res) => {
    const game = req.body;
    let query = `INSERT INTO serious_game 
        (   
            nome_sg, 
            genero_sg, 
            foco_sg,
            descricao_sg,
            cod_pessoa
        ) 
        VALUES
        (
            ?,?,?,?,?
        )`;

    let form_values = [
        game.nome,
        game.genero,
        game.foco,
        game.descricao,
        req.session.userId
    ]
    console.log(query);
    console.log(form_values);
    console.log(req.session.userId);

    execSQLQuery(query, form_values)
        .then(dbResponse => {
            res.redirect('/gamepanel');
        })
        .catch(error => {
            res.redirect('/login');
        });


});