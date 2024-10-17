// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'Documentación de la API para El Sistema deGestion de Inventario Sion FashionShop',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Cambia según tu entorno
            },
        ],
    },
    apis: ['./routes/*.js'], // Ruta a los archivos donde tienes tus rutas
};



const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
