const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    /* 
        I'm using using "../" here because I'm accessing
        the views folder from this home_controller.js file folder.
     */
    res.render('../views/index.ejs');
});

module.exports = router;