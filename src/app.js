const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// load env variables
require('dotenv').config();

// API porta
const PORT = 6969;
const API_VERSION = 1;
const API_URL = `/api/v${API_VERSION}`;

const app = express();

// imposta l'origine valida, i metodi e gli header
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// imposta json ocme ricevuta e risposta 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// root router
const rootV1Router = require('./routes/rootv1.js');

// handler della root
app.use(`${API_URL}/`, rootV1Router);

// app.use('/src', express.static('src'));

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