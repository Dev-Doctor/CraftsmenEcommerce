const express = require('express');
const router = express.Router();
const pool = require('../db');
const queries = require('../queries');
const bcrypt = require('bcryptjs');
const { DbUtils } = require('../Utils');

router.put('/password', async function (req, res) {
    const authHeader = req.headers['authorization'];
    
    // check if the headers is present
    if (!authHeader) {
        return res.status(401).json({ error: "Missing auth header" }).send();
    }

    const { old_password, new_password } = req.body;

    if (!old_password || !new_password || typeof old_password !== 'string' || typeof new_password !== 'string') {
        return res.status(400).json({ error: 'Invalid params' });
    }

    const client = await pool.connect();

    // get user by token

    // compare password

    const hashed_password = bcrypt.hashSync(new_password, bcrypt.genSaltSync());

    // change to new password
});