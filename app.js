'use strict';
/* Settings */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;


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



