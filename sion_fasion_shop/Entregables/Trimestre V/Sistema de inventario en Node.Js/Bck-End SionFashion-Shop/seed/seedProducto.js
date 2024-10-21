const mongoose = require('mongoose');
const Producto = require('../models/producto'); // Ajusta la ruta según tu estructura
const SubCategoria = require('../models/sub_categoria'); // Modelo de subcategorías
const Proveedor = require('../models/proveedor'); // Modelo de proveedores
const Tienda = require('../models/tienda'); // Modelo de tiendas

// Semilla de Productos
const productosData = [
    {
        nombre_producto: "Laptop",
        descripcion_producto: "Laptop de alta gama",
        precio_producto: 1500.00,
        unidad_medida: "unidad",
        peso_del_producto: "2.5 kg",
        ubicacion_producto: "Estante A1",
        id_sub_categoria: "SubCategoria_ID_1", // Cambiar por el ID correcto de la subcategoría
        id_proveedor: "Proveedor_ID_1", // Cambiar por el ID correcto del proveedor
        id_tienda: "Tienda_ID_1", // Cambiar por el ID correcto de la tienda
        id_factura: null // Puede ser null si no hay una factura asociada
    },
    {
        nombre_producto: "Mouse Inalambrico",
        descripcion_producto: "Mouse inalámbrico ergonómico",
        precio_producto: 50.00,
        unidad_medida: "unidad",
        peso_del_producto: "0.15 kg",
        ubicacion_producto: "Estante A2",
        id_sub_categoria: "SubCategoria_ID_2", // Cambiar por el ID correcto de la subcategoría
        id_proveedor: "Proveedor_ID_2", // Cambiar por el ID correcto del proveedor
        id_tienda: "Tienda_ID_2", // Cambiar por el ID correcto de la tienda
        id_factura: null // Puede ser null si no hay una factura asociada
    }
];

async function seedProductos() {
    console.log('Iniciando la siembra de productos...');
    try {
        for (const producto of productosData) {
            // Verificar si las referencias existen
            const subCategoria = await SubCategoria.findById(producto.id_sub_categoria);
            const proveedor = await Proveedor.findById(producto.id_proveedor);
            const tienda = await Tienda.findById(producto.id_tienda);

            if (!subCategoria || !proveedor || !tienda) {
                console.log(`Algunos datos de referencia no fueron encontrados para el producto ${producto.nombre_producto}. Se omitirá este producto.`);
                continue; // Salta al siguiente producto si alguna referencia no se encuentra
            }

            // Crear el nuevo registro de producto
            await Producto.create({
                nombre_producto: producto.nombre_producto,
                descripcion_producto: producto.descripcion_producto,
                precio_producto: producto.precio_producto,
                unidad_medida: producto.unidad_medida,
                peso_del_producto: producto.peso_del_producto,
                ubicacion_producto: producto.ubicacion_producto,
                id_sub_categoria: producto.id_sub_categoria,
                id_proveedor: producto.id_proveedor,
                id_tienda: producto.id_tienda,
                id_factura: producto.id_factura
            });

            console.log(`Producto ${producto.nombre_producto} creado con éxito.`);
        }
        console.log('Semillas de productos completadas.');
    } catch (err) {
        console.error('Error al crear semillas de productos:', err);
    }
}

module.exports = seedProductos;
