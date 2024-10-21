const mongoose = require('mongoose');
const SubCategoria = require('../models/sub_categoria'); // Ajusta la ruta según tu estructura
const Categoria = require('../models/categoria'); // Modelo de categorías

// Semilla de Subcategorías
const subCategoriasData = [
    {
        nombre_sub_categoria: "Electrónica",
        id_categoria: "Categoria_ID_1", // Cambia por el ID correcto de la categoría
        productos: ["Producto_ID_1", "Producto_ID_2"] // Cambiar por los IDs correctos de los productos
    },
    {
        nombre_sub_categoria: "Ropa",
        id_categoria: "Categoria_ID_2", // Cambia por el ID correcto de la categoría
        productos: [] // Puede ser vacío si no hay productos asociados inicialmente
    },
    {
        nombre_sub_categoria: "Alimentos",
        id_categoria: "Categoria_ID_3", // Cambia por el ID correcto de la categoría
        productos: ["Producto_ID_3"] // Cambiar por el ID correcto de un producto
    }
];

async function seedSubCategorias() {
    console.log('Iniciando la siembra de subcategorías...');
    try {
        for (const subCategoria of subCategoriasData) {
            // Verificar si la categoría referenciada existe
            const categoriaExistente = await Categoria.findById(subCategoria.id_categoria);

            // Si la categoría no existe, informar y omitir
            if (!categoriaExistente) {
                console.log(`La categoría referenciada no fue encontrada para la subcategoría: ${subCategoria.nombre_sub_categoria}. Se omitirá esta subcategoría.`);
                continue; // Salta al siguiente subcategoría si no se encuentra la categoría
            }

            // Crear la nueva subcategoría
            const nuevaSubCategoria = await SubCategoria.create({
                nombre_sub_categoria: subCategoria.nombre_sub_categoria,
                id_categoria: subCategoria.id_categoria,
                productos: subCategoria.productos
            });

            console.log(`Subcategoría creada con éxito: ${nuevaSubCategoria.nombre_sub_categoria}.`);
        }
        console.log('Semillas de subcategorías completadas.');
    } catch (err) {
        console.error('Error al crear semillas de subcategorías:', err);
    }
}

module.exports = seedSubCategorias;
