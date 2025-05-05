const express = require('express');
const router = express.Router();
const pool = require('../db');
const queries = require('../queries');
const DataUtils = require('../Utils');
const bcrypt = require('bcryptjs');

router.post('/', async function (req, res) {
    // write to body in chat to check
    console.log(req.body);

    // get the keys
    const { email, name, lastname, password, passed_token } = req.body;

    // get a client
    const client = await pool.connect();

    // check for email and password
    if (typeof email == 'string' && typeof password == 'string') {
        // execute the query
        const user_data = await client.query(queries.USER_BY_EMAIL, [email]);

        console.log(user_data.rows);

        // check if the password is valid
        if (!bcrypt.compareSync(password, user_data.password)) {
            return res.status(400).send();
        }

        // generate a random token
        const token = DataUtils.GenerateToken();

        // insert the token in the database
        await client.query(queries.CREATE_USER_TOKEN, [user_data[0].user_id, token]);

        // release the client
        client.release();

        // send back the token to the client
        return res.status(200).json({
            token: token
        }).send();
    }

    // check for token
    if (typeof token == 'string') {

    }
    // release the client
    client.release();
    return res.status(418).send();
});

module.exports = router;