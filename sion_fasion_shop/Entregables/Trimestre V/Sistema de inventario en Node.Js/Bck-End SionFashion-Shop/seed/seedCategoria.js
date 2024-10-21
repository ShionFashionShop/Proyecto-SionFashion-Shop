const mongoose = require('mongoose');
const Categoria = require('../models/categoria'); // Ajusta la ruta según tu estructura
const SubCategoria = require('../models/sub_categoria'); // Asegúrate de que la ruta sea correcta

// Semilla de Categorías
const categoriasData = [
    {
        nombre_categoria: "Electrónica",
        sub_categorias: ["Laptops", "Smartphones"] // Nombres de subcategorías a asociar
    },
    {
        nombre_categoria: "Móviles",
        sub_categorias: ["Smartphones", "Accesorios para Móviles"]
    },
    {
        nombre_categoria: "Accesorios",
        sub_categorias: ["Audífonos", "Cargadores", "Fundas"]
    }
];

async function seedCategorias() {
    console.log('Iniciando la siembra de categorías...');
    try {
        for (const categoriaData of categoriasData) {
            // Buscar si la categoría ya existe
            const categoriaExistente = await Categoria.findOne({ nombre_categoria: categoriaData.nombre_categoria });
            console.log(`Buscando categoría: ${categoriaData.nombre_categoria}`);
            
            if (!categoriaExistente) {
                // Buscar las subcategorías por nombre
                const subCategoriaIds = [];
                for (const subCategoriaNombre of categoriaData.sub_categorias) {
                    const subCategoria = await SubCategoria.findOne({ nombre_sub_categoria: subCategoriaNombre });
                    if (subCategoria) {
                        subCategoriaIds.push(subCategoria._id);
                    } else {
                        console.log(`Subcategoría "${subCategoriaNombre}" no encontrada.`);
                    }
                }
                
                // Crear la nueva categoría con las subcategorías asociadas
                await Categoria.create({
                    nombre_categoria: categoriaData.nombre_categoria,
                    sub_categoria: subCategoriaIds
                });
                console.log(`Categoría "${categoriaData.nombre_categoria}" creada.`);
            } else {
                console.log(`Categoría "${categoriaData.nombre_categoria}" ya existe.`);
            }
        }
        console.log('Semillas de categorías completadas.');
    } catch (err) {
        console.error('Error al crear semillas de categorías:', err);
    }
}

module.exports = seedCategorias;
