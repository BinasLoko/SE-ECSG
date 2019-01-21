'use strict';
/* Settings */
const express = require('express');
const app = express();
const port = 8000;

/* Controller Imports */
const home = require('./controllers/home_controller');

/* Middlewares */
app.use(express.static('public'));

/* Routing */
app.use('/', home);

/* Server */
app.listen(port, () => console.log(`Running at localhost:${port}!`));