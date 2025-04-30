const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
    res.json({
        test: "It seems its working, I am hating even more node.js"
    }
    );
    res.statusCode('418');
});

module.exports = router;