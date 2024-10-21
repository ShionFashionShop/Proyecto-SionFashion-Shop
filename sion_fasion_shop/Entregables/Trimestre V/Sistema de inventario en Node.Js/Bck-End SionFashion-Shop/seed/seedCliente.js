const mongoose = require('mongoose');
const Cliente = require('../models/cliente'); // Ajusta la ruta según tu estructura
const Factura = require('../models/factura'); // Modelo factura
const OrdenDeCompra = require('../models/ordenesDeCompra'); // Modelo orden de compra

// Semilla de Clientes
const clientesData = [
    {
        nombre_cliente: "Juan Pérez",
        email_cliente: "juan.perez@example.com",
        telefono_cliente: "+573001234567",
        direccion_cliente: "Calle Falsa 123",
        facturas: ["Factura 001", "Factura 002"], // Nombres de facturas a asociar
        ordenes_de_compras: ["Orden 001", "Orden 002"] // Nombres de órdenes de compra a asociar
    },
    {
        nombre_cliente: "Ana Gómez",
        email_cliente: "ana.gomez@example.com",
        telefono_cliente: "+573001234568",
        direccion_cliente: "Carrera 45 #32-18",
        facturas: ["Factura 003"],
        ordenes_de_compras: ["Orden 003"]
    }
];

async function seedClientes() {
    console.log('Iniciando la siembra de clientes...');
    try {
        for (const clienteData of clientesData) {
            // Buscar si el cliente ya existe
            const clienteExistente = await Cliente.findOne({ nombre_cliente: clienteData.nombre_cliente });
            console.log(`Buscando cliente: ${clienteData.nombre_cliente}`);
            
            if (!clienteExistente) {
                // Buscar facturas por nombre
                const facturaIds = [];
                for (const facturaNombre of clienteData.facturas) {
                    const factura = await Factura.findOne({ nombre_factura: facturaNombre });
                    if (factura) {
                        facturaIds.push(factura._id);
                    } else {
                        console.log(`Factura "${facturaNombre}" no encontrada.`);
                    }
                }

                // Buscar órdenes de compra por nombre
                const ordenDeCompraIds = [];
                for (const ordenNombre of clienteData.ordenes_de_compras) {
                    const ordenDeCompra = await OrdenDeCompra.findOne({ nombre_orden: ordenNombre });
                    if (ordenDeCompra) {
                        ordenDeCompraIds.push(ordenDeCompra._id);
                    } else {
                        console.log(`Orden de compra "${ordenNombre}" no encontrada.`);
                    }
                }

                // Crear el nuevo cliente con las referencias
                await Cliente.create({
                    nombre_cliente: clienteData.nombre_cliente,
                    email_cliente: clienteData.email_cliente,
                    telefono_cliente: clienteData.telefono_cliente,
                    direccion_cliente: clienteData.direccion_cliente,
                    facturas: facturaIds,
                    ordenes_de_compras: ordenDeCompraIds
                });
                console.log(`Cliente "${clienteData.nombre_cliente}" creado.`);
            } else {
                console.log(`Cliente "${clienteData.nombre_cliente}" ya existe.`);
            }
        }
        console.log('Semillas de clientes completadas.');
    } catch (err) {
        console.error('Error al crear semillas de clientes:', err);
    }
}

module.exports = seedClientes;
