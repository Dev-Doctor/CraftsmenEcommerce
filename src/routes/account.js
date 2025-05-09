const express = require('express');
const router = express.Router();
const pool = require('../db');
const queries = require('../queries');
const bcrypt = require('bcryptjs');
const { DbUtils, DbUserUtils } = require('../Utils');

router.put('/password', async function (req, res) {
    const authHeader = req.headers['authorization'];

    // check if the headers is present
    if (!authHeader) {
        return res.status(401).json({ error: "Missing auth header" }).send();
    }

    const { old_password, new_password } = req.body;

    // check if body data is valid
    if (!old_password || !new_password || typeof old_password !== 'string' || typeof new_password !== 'string') {
        return res.status(400).json({ error: 'Invalid params' });
    }

    const client = await pool.connect();

    // check if token is valid
    if (!DbUtils.IsTokenValid(client, authHeader)) {
        return res.status(401).json({ error: "token expired" }).send();
    }

    const user = await DbUtils.GetUserByToken(client, authHeader);

    // compare password
    if (!bcrypt.compareSync(old_password, user.password)) {
        return res.status(400).json({ error: "password not valid" }).send();
    }

    const hashed_password = bcrypt.hashSync(new_password, bcrypt.genSaltSync());

    // update the password
    await DbUserUtils.ChangePassword(client, user.user_id, hashed_password);

    return res.status(201).send();
});

router.put('/email', async function (req, res) {
    const authHeader = req.headers['authorization'];

    // check if the headers is present
    if (!authHeader) {
        return res.status(401).json({ error: "Missing auth header" }).send();
    }

    const { new_email } = req.body;

    // check if body data is valid
    if (!new_email || typeof new_email !== 'string') {
        return res.status(400).json({ error: 'Invalid params' });
    }

    const client = await pool.connect();

    // check if token is valid
    if (!DbUtils.IsTokenValid(client, authHeader)) {
        return res.status(401).json({ error: "token expired" }).send();
    }

    const user = await DbUtils.GetUserByToken(client, authHeader);

    // update the email
    await DbUserUtils.ChangeEmail(client, user.user_id, new_email);

    return res.status(201).send();
});

router.delete('/delete', async function (req, res) {
    return res.status(501).json({error:"Not yet implemented"}).send();
});

router.post('/seller', async function (req, res) {
    return res.status(501).json({error:"Not yet implemented"}).send();
})

module.exports = router;