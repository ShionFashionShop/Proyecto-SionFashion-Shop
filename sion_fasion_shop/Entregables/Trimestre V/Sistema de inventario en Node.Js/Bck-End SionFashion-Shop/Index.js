import express from 'express'; // Cambiar require por import
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

// Inicialización de la aplicación Express
const app = express();
const port = 3000;

// Obtener el nombre del archivo y directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL de conexión a MongoDB (reemplaza con tu propia URL de MongoDB)
const mongoURI = 'mongodb+srv://santiagoprietoa:tWWXE4zvrZh5f6uA@proyectosenalaboratoiom.gl0wv.mongodb.net/?retryWrites=true&w=majority&appName=ProyectoSENALaboratoioMongo';

// Conectar a MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB correctamente'))
.catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); // Cerrar el servidor si no se puede conectar a MongoDB
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Usar __dirname correctamente

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Usar __dirname correctamente


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
