const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./Swagger/Swagger'); // Asegúrate de que esta ruta coincida
const fs = require('fs');
const https = require('https');
const cors = require('cors'); // Requiere cors
const path = require('path');


// Importar rutas
const alertasStockRoutes = require('./Routes/alertasStockRoutes');
const categoriasRoutes = require('./Routes/categoriaRoutes');
const ciudadesRoutes = require('./Routes/ciudadeRoutes');
const clienteRoutes = require('./Routes/clienteRoutes');
const departamentoRoutes = require('./Routes/departamentoRoutes');
const empleadoRoutes = require('./Routes/empleadoRoutes');
const empresaRoutes = require('./Routes/empresaRoutes');
const facturaRoutes = require('./Routes/facturaRoutes');
const historialinventarioRoutes = require('./Routes/historialinventarioRoutes');
const inventarioRoutes = require('./Routes/inventarioRoutes');
const metododepagoRoutes = require('./Routes/metododepagoRoutes');
const ordenesdecompraRoutes = require('./Routes/ordenesdecompraRoutes');
const ordenesproductoRoutes = require('./Routes/ordenesproductoRouter');
const paiseRoutes = require('./Routes/paiseRoutes');
const productoRoutes = require('./Routes/productoRoutes');
const proveedorRoutes = require('./Routes/proveedorRoutes');
const registroactividadRoutes = require('./Routes/registroactividadRoutes');
const roleRoutes = require('./Routes/roleRoutes');
const sub_categoriaRoutes = require('./Routes/sub_categoriaRoutes');
const tiendaRoutes = require('./Routes/tiendaRoutes');
const usuarioRoutes = require('./Routes/usuarioRoutes');

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: '*', // Permite todos los orígenes; ajusta esto según sea necesario
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Cargar el certificado SSL y la clave privada
const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.pem')),
};

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Redirigir HTTP a HTTPS (opcional, si deseas forzar HTTPS)
app.use((req, res, next) => {
    if (req.protocol === 'http') {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
});
*/


// Rutas de la aplicación
app.use('/api/alertasStock', alertasStockRoutes);
app.use('/api', categoriasRoutes);
app.use('/api', ciudadesRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api', departamentoRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api', empresaRoutes);
app.use('/api', facturaRoutes);
app.use('/api', historialinventarioRoutes);
app.use('/api', inventarioRoutes);
app.use('/api', metododepagoRoutes);
app.use('/api', ordenesdecompraRoutes);
app.use('/api', ordenesproductoRoutes);
app.use('/api', paiseRoutes);
app.use('/api', productoRoutes);
app.use('/api', proveedorRoutes);
app.use('/api', registroactividadRoutes);
app.use('/api', roleRoutes);
app.use('/api', sub_categoriaRoutes);
app.use('/api', tiendaRoutes);
app.use('/api', usuarioRoutes);

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://santiagoprietoa:tWWXE4zvrZh5f6uA@proyectosenalaboratoiom.gl0wv.mongodb.net/?retryWrites=true&w=majority&appName=ProyectoSENALaboratoioMongo')
    .then(() => {
        console.log('Conectado a MongoDB');

        // Manejo de errores
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Algo salió mal!');
        });

        // Iniciar el servidor
        const PORT = process.env.PORT || 3000;

        https.createServer(options, app).listen(PORT, () => {
            console.log(`API Rest OK y ejecutándose...`);
            console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}/api-docs/#/`);
        });
    })
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));