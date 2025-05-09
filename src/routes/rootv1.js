const express = require('express');
const router = express.Router();
// swagger stuff
const swaggerUi = require('swagger-ui-express'); //integra un doc in modo automatico
const swaggerDocument = require('../swagger/swagger-output.json'); //espone su pagina web

router.get('/', (req, res) => {
    console.log(`Accesso avvenuto da ${req.ip}!`);
    res.json({
        user: "Skibidi",
        message: "The API is on!",
        help: "/api-docs"
    });
});

// carica i vari routers per le varie routes
const loginRouter = require('./login.js');
const registerRouter = require('./register.js');
const productRouter = require('./product.js');
const sellerRouter = require('./sellers.js');
const accountRouter = require('./account.js');

// imposta il router per ogni route
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/seller', sellerRouter);
router.use('/account', accountRouter);

// imposta la route di swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;