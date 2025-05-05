const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async function (req, res) {
    if(req.route.method !== 'post') {
        res.statusCode(405, 'Method Not Allowed');
        return;
    }
    
    res.json({
        sigma: "sei impazzita"
    });
});

module.exports = router;