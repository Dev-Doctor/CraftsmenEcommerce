const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// swagger stuff
const swaggerUi = require('swagger-ui-express'); //integra un doc in modo automatico
const swaggerDocument = require('./swagger/swagger-output.json'); //espone su pagina web
// Database module
const pg = require('pg');

// load env variables
require('dotenv').config();

// API porta
const PORT = 6969;
const app = express();

// imposta l'origine valida, i metodi e gli header
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// imposta json ocme ricevuta e risposta 
app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded( extended: true ));

// handler della root
app.get('/', (req, res) => {
    console.log(`Accesso avvenuto da ${req.ip}!`);
    res.json({
        user: "Skibidi",
        message: "The API is on!",
        help: "/api-docs"
    });
});

// carica i vari routers per le varie routes
const loginRouter = require('./routes/login.js');
const registerRouter = require('./routes/register.js');
const productRouter = require('./routes/product.js');

// imposta il router per ogni route
app.use('/login', loginRouter);
app.use('/register', registerRouter);
// app.use('/src', express.static('src'));

// imposta la route di swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//raccoglie tutte le richieste che non hanno avuto risposta precedentemente
app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

//raccoglie tutti i tipi di errori
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

// ignizia ad ascoltare sulla porta passata
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\n`);
});