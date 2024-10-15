const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./Swagger/swagger'); // Asegúrate de que esta ruta coincida
const categoriasRoutes = require('./Routes/categoriaRoutes'); // Ruta a tus rutas de categorías

// Importar rutas
const alertasStockRoutes = require('./Routes/alertasStockRoutes');

const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la aplicación
app.use('/api/alertasStock', require('./Routes/alertasStockRoutes'));
app.use('/api', categoriasRoutes);


// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://santiagoprietoa:tWWXE4zvrZh5f6uA@proyectosenalaboratoiom.gl0wv.mongodb.net/?retryWrites=true&w=majority&appName=ProyectoSENALaboratoioMongo')
    .then(() => {
        console.log('Conectado a MongoDB');

        // Iniciar el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`API Rest OK y ejecutándose en http://localhost:${PORT}`);
            console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
        });
    })
    .catch(err => {
        console.log('No se pudo conectar con MongoDB..', err);
    });
