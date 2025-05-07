const express = require('express');
const router = express.Router();
const pool = require('../db');
const queries = require('../queries');
const bcrypt = require('bcryptjs');
const { DbUtils, DataUtils } = require('../Utils');


router.post('/', async function (req, res) {
    // get the params
    const { email, password, token } = req.body;

    // get a client
    const client = await pool.connect();

    // check for email and password
    if (typeof email == 'string' && typeof password == 'string') {
        // execute the query
        const user_data = await DbUtils.GetUserDataByEmail(client, email);

        console.log(user_data.rows);

        // check if the password is valid
        if (!bcrypt.compareSync(password, user_data.rows[0].password)) {
            client.release();
            return res.status(400).send();
        }

        // generate a random token
        new_token = DataUtils.GenerateToken();

        // insert the token in the database
        await client.query(queries.CREATE_USER_TOKEN, [user_data.rows[0].user_id, new_token]);

        // release the client
        client.release();

        // send back the token to the client
        return res.status(200).json({
            token: new_token
        }).send();
    }

    // check for token
    if (typeof token == 'string') {
        // fetch the token from db
        const result = await client.query(queries.CHECK_USER_TOKEN, [token]);

        // check if the token is valid
        if (!(result.rows.length !== 0)) {
            client.release();
            return res.status(400).json({ error: 'token not valid' }).send();
        }

        // check if the token is not expired
        if (!(result.rows[0].expiration_date > new Date)) {
            await DbUtils.DeleteToken(client, token);
            client.release();
            return res.status(400).json({ error: 'token not valid' }).send();
        }

        // token valid
        client.release();
        return res.status(200).send();
    }
    
    // release the client
    client.release();
    return res.status(400).send();
});

module.exports = router;