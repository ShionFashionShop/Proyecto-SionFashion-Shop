const mongoose = require('mongoose');
const Proveedor = require('../models/proveedor'); // Ajusta la ruta según tu estructura
const Ciudade = require('../models/ciudade'); // Modelo de ciudades

// Semilla de Proveedores
const proveedoresData = [
    {
        nombre_proveedor: "Proveedor A",
        contacto_proveedor: "Juan Pérez",
        email_proveedor: "juan.perez@proveedora.com",
        id_ciudad: "Ciudad_ID_1", // Cambiar por el ID correcto de la ciudad
        productos: [] // Puedes agregar los IDs de los productos relacionados aquí
    },
    {
        nombre_proveedor: "Proveedor B",
        contacto_proveedor: "María López",
        email_proveedor: "maria.lopez@proveedorb.com",
        id_ciudad: "Ciudad_ID_2", // Cambiar por el ID correcto de la ciudad
        productos: [] // Puedes agregar los IDs de los productos relacionados aquí
    }
];

async function seedProveedores() {
    console.log('Iniciando la siembra de proveedores...');
    try {
        for (const proveedor of proveedoresData) {
            // Verificar si la referencia de ciudad existe
            const ciudad = await Ciudade.findById(proveedor.id_ciudad);

            if (!ciudad) {
                console.log(`La ciudad referenciada no fue encontrada para el proveedor ${proveedor.nombre_proveedor}. Se omitirá este proveedor.`);
                continue; // Salta al siguiente proveedor si la referencia no se encuentra
            }

            // Crear el nuevo registro de proveedor
            await Proveedor.create({
                nombre_proveedor: proveedor.nombre_proveedor,
                contacto_proveedor: proveedor.contacto_proveedor,
                email_proveedor: proveedor.email_proveedor,
                id_ciudad: proveedor.id_ciudad,
                productos: proveedor.productos // Puede ser un array vacío si no hay productos
            });

            console.log(`Proveedor ${proveedor.nombre_proveedor} creado con éxito.`);
        }
        console.log('Semillas de proveedores completadas.');
    } catch (err) {
        console.error('Error al crear semillas de proveedores:', err);
    }
}

module.exports = seedProveedores;
