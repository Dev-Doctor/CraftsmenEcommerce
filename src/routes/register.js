const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', async function (req, res) {
    
    // check if there is already an account
    // if (user_data.rows.length === 0) {
    //     return res.status(400).send();
    // }

    const salt = bcrypt.genSaltSync();
    console.log(bcrypt.hashSync("password", salt))
    res.json({
        test: "It seems its working, I am hating even more node.js"
    }
    );
    res.statusCode('418');
});

module.exports = router;