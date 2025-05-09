const express = require('express');
const router = express.Router();
const pool = require('../db');
const queries = require('../queries');
const { DbUtils } = require('../Utils');

// SHOULD WORK DIDN'T TEST IT
router.get('/:id', async function (req, res) {
    // get the id from the url
    const id = req.params.id;

    // if is not a valid number send error
    if (typeof id !== 'number' && id >= 0) {
        return res.status(400).json({ error: "Id not valid" }).send();
    }

    // get a client
    const client = await pool.connect();

    // make the query
    const result = await client.query(queries.SELLER_BY_USER_ID, [id]);

    // if there is no result error
    if(result.rows.length < 1) {
        return res.status(400).json({ error: "Id not valid" }).send();
    }

    // release the client & send the result
    client.release();
    res.status(200).json({
        seller_name: result[0].seller_name,
        description: result[0].description
    }).send();
});

router.get('/', async function (req, res) {
    res.json({ skibidi: "skibidi" })
});

module.exports = router;