'use strict';

/* Settings */
const express = require('express');
const app = express();
const port = 8000;

/* Middlewares */
app.use(express.static('public'))

/* Routing */
app.get('/', (req, res) => res.send('Hello World!'))

/* Server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))