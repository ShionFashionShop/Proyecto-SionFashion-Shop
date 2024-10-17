const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./Swagger/Swagger'); // Asegúrate de que esta ruta coincida

// Importar rutas
const alertasStockRoutes = require('./Routes/alertasStockRoutes');
const categoriasRoutes = require('./Routes/categoriaRoutes');
const ciudadesRoutes = require('./Routes/ciudadeRoutes');
const clienteRoutes = require('./Routes/clienteRoutes');
const departamentoRoutes = require ('./Routes/departamentoRoutes.js');
const empleadoRoutes = require ('./Routes/empleadoRoutes.js');
const empresaRoutes = require ('./Routes/empresaRoutes.js');
const facturaRoutes = require ('./Routes/facturaRoutes.js');
const historialinventarioRoutes = require ('./Routes/historialinventarioRoutes.js');
const inventarioRoutes = require ('./Routes/inventarioRoutes.js');
const metododepagoRoutes = require ('./Routes/metododepagoRoutes.js');
const ordenesdecompraRoutes = require ('./Routes/ordenesdecompraRoutes.js');
const ordenesproductoRoutes = require ('./Routes/ordenesproductoRouter.js');
const paiseRoutes = require ('./Routes/paiseRoutes.js');
const productoRoutes = require ('./Routes/productoRoutes.js');
const proveedorRoutes = require ('./Routes/proveedorRoutes.js');
const registroactividadRoutes = require ('./Routes/registroactividadRoutes.js');
const roleRoutes = require ('./Routes/roleRoutes.js');
const sub_categoriaRoutes = require ('./Routes/sub_categoriaRoutes.js');



const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
