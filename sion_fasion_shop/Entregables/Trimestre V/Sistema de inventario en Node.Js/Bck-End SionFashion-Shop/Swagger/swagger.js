// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Alertas Stock',
            version: '1.0.0',
            description: 'Documentación de la API para gestionar alertas de stock',
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
