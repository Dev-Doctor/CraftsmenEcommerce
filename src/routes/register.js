const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const { DbUtils, DataUtils } = require('../Utils');

router.get('/', async function (req, res) {
    // get the params
    const { name, lastname, email, password } = req.body;

    // check if email is valid
    if(!DataUtils.IsEmailValid(email)) {
        return res.status(400).json({error:"email not valid"}).send();
    }

    // get a client
    const client = await pool.connect();

    // if any of the passed arguments are not string flag error
    if (!typeof name == 'string' || !typeof lastname == 'string' || !typeof email == 'string' || !typeof password == 'string') {
        client.release();
        return res.status(400).send();
    }

    // if an account with that email already exists flag error
    if (await DbUtils.IsEmailAlreadyUsed(client, email)) {
        client.release();
        return res.status(400).json({error:"email already in use"}).send();
    }

    const salt = bcrypt.genSaltSync();

    DbUtils.AddNewUser(client, name, lastname, email, bcrypt.hashSync(password, salt));

    client.release();
    return res.status(201).send();
});

module.exports = router;