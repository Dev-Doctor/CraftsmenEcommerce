const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async function (req, res) {
   const client = await pool.connect()
    const {rows} = await pool.query('SELECT * from products WHERE id = $1 ',[1])
    res.json(rows[0]);
    client.release()
});

module.exports = router;