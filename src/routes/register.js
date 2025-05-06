const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const { DbUtils } = require('../Utils');

router.get('/', async function (req, res) {
    // get the params
    const { name, lastname, email, password } = req.body;

    // get a client
    const client = await pool.connect();

    // ####### !!!!!!!!!!!!! MISSING CHECK FOR EMAIL !!!!!!!!!!!!! #######

    // if any of the passed arguments are not string flag error
    if (!typeof name == 'string' || !typeof lastname == 'string' || !typeof email == 'string' || !typeof password == 'string') {
        client.release();
        console.log('nigger!');
        return res.status(400).send();
    }

    // if an account with that email already exists flag error
    if (await DbUtils.IsEmailAlreadyUsed(client, email)) {
        client.release();
        console.log('negus?!');
        return res.status(400).send();
    }

    const salt = bcrypt.genSaltSync();

    DbUtils.AddNewUser(client, name, lastname, email, bcrypt.hashSync(password, salt));

    client.release();
    return res.status(201).send();
});

module.exports = router;