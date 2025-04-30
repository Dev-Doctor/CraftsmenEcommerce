const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Ecommerce-API',
    description: 'API per l\'applicazione Craftsmen E-Commerce.'
  },
  host: `localhost:${'6969'}`
};

const outputFile = './swagger-output.json';
const routes = ['./../app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
//,'routes/volontari.js', 'routes/turni.js', 'routes/recapiti.js', 'routes/certificazioni.js', 'routes/festivi.js', 'routes/pre_festivi.js'
swaggerAutogen(outputFile, routes, doc);