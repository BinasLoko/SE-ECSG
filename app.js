'use strict';
/* Settings */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* Controller Imports */
const home = require('./controllers/home_controller');

/* Middlewares */
app.use(express.static('public'));
app.set('view engine', 'ejs');

/* Routing */
app.use('/', home);

/* Server */
app.listen(port, () => console.log(`Running at localhost:${port}!`));


function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'expertsystemdb'
  });
 
  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}
