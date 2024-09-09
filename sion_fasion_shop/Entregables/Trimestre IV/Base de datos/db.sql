CREATE DATABASE SIONFASHIONSHOP;
GO

USE SIONFASHIONSHOP;
GO

CREATE TABLE [paises] (
  [id_pais] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_pais] NVARCHAR(255) NOT NULL
);

CREATE TABLE [departamentos] (
  [id_departamento] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_departamento] NVARCHAR(255) NOT NULL,
  [id_pais] INT NOT NULL,
  FOREIGN KEY ([id_pais]) REFERENCES [paises]([id_pais])
);

CREATE TABLE [ciudades] (
  [id_ciudad] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_ciudad] NVARCHAR(255) NOT NULL,
  [id_departamento] INT NOT NULL,
  FOREIGN KEY ([id_departamento]) REFERENCES [departamentos]([id_departamento])
);

CREATE TABLE [empresas] (
  [id_empresa] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_empresa] NVARCHAR(255) NOT NULL,
  [direccion_empresa] NVARCHAR(255),
  [telefono_empresa] NVARCHAR(255),
  [email_empresa] NVARCHAR(255)
);

CREATE TABLE [proveedores] (
  [id_proveedor] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_proveedor] NVARCHAR(255) NOT NULL,
  [contacto_proveedor] NVARCHAR(255),
  [email_proveedor] NVARCHAR(255),
  [id_ciudad] INT,
  FOREIGN KEY ([id_ciudad]) REFERENCES [ciudades]([id_ciudad])
);

CREATE TABLE [categorias] (
  [id_categoria] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_categoria] NVARCHAR(255) NOT NULL
);

CREATE TABLE [sub_categorias] (
  [id_sub_categoria] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_sub_categoria] NVARCHAR(255) NOT NULL,
  [id_categoria] INT NOT NULL,
  FOREIGN KEY ([id_categoria]) REFERENCES [categorias]([id_categoria])
);

CREATE TABLE [tiendas] (
  [id_tienda] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_tienda] NVARCHAR(255) NOT NULL,
  [telefono_tienda] NVARCHAR(255),
  [ubicacion_tienda] NVARCHAR(255),
  [id_ciudad] INT NOT NULL,
  [id_empresa] INT NOT NULL,
  FOREIGN KEY ([id_ciudad]) REFERENCES [ciudades]([id_ciudad]),
  FOREIGN KEY ([id_empresa]) REFERENCES [empresas]([id_empresa])
);

CREATE TABLE [empleados] (
  [id_empleado] INT PRIMARY KEY IDENTITY(1,1),
  [dni_empleado] NVARCHAR(255) UNIQUE NOT NULL,
  [nombres_empleado] NVARCHAR(255) NOT NULL,
  [apellidos_empleado] NVARCHAR(255) NOT NULL,
  [telefono_empleado] NVARCHAR(255),
  [email_empleado] NVARCHAR(255),
  [id_tienda] INT NOT NULL,
  [id_ciudad] INT NOT NULL,
  FOREIGN KEY ([id_tienda]) REFERENCES [tiendas]([id_tienda]),
  FOREIGN KEY ([id_ciudad]) REFERENCES [ciudades]([id_ciudad])
);

CREATE TABLE [clientes] (
  [id_cliente] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_cliente] NVARCHAR(255),
  [email_cliente] NVARCHAR(255),
  [telefono_cliente] NVARCHAR(255),
  [direccion_cliente] NVARCHAR(255)
);

CREATE TABLE [facturas] (
  [id_factura] INT PRIMARY KEY IDENTITY(1,1),
  [fecha_emision_factura] DATETIME NOT NULL,
  [sub_total_factura] DECIMAL(10,2) NOT NULL,
  [impuesto_factura] DECIMAL(10,2) NOT NULL,
  [total_factura] DECIMAL(10,2) NOT NULL,
  [id_cliente] INT NOT NULL,
  FOREIGN KEY ([id_cliente]) REFERENCES [clientes]([id_cliente])
);

CREATE TABLE [ordenes_de_compra] (
  [id_orden_compra] INT PRIMARY KEY IDENTITY(1,1),
  [id_cliente] INT NOT NULL,
  [id_factura] INT,
  [id_empleado] INT,
  FOREIGN KEY ([id_cliente]) REFERENCES [clientes]([id_cliente]),
  FOREIGN KEY ([id_factura]) REFERENCES [facturas]([id_factura]),
  FOREIGN KEY ([id_empleado]) REFERENCES [empleados]([id_empleado])
);

CREATE TABLE [productos] (
  [id_producto] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_producto] NVARCHAR(255) NOT NULL,
  [descripcion_producto] NVARCHAR(255),
  [precio_producto] DECIMAL(10,2) NOT NULL,
  [unidad_medida] NVARCHAR(4),
  [peso_del_producto] NVARCHAR(255),
  [ubicacion_producto] NVARCHAR(255),
  [id_sub_categoria] INT NOT NULL,
  [id_proveedor] INT NOT NULL,
  [id_tienda] INT NOT NULL,
  [id_factura] INT,
  FOREIGN KEY ([id_sub_categoria]) REFERENCES [sub_categorias]([id_sub_categoria]),
  FOREIGN KEY ([id_proveedor]) REFERENCES [proveedores]([id_proveedor]),
  FOREIGN KEY ([id_tienda]) REFERENCES [tiendas]([id_tienda]),
  FOREIGN KEY ([id_factura]) REFERENCES [facturas]([id_factura])
);

CREATE TABLE [metodos_de_pago] (
  [id_metodo_pago] INT PRIMARY KEY IDENTITY(1,1),
  [metodo_pago] NVARCHAR(50) CHECK ([metodo_pago] IN ('EFECTIVO', 'TARJETA', 'NEQUI', 'DAVIPLATA')) NOT NULL,
  [id_factura] INT,
  FOREIGN KEY ([id_factura]) REFERENCES [facturas]([id_factura])
);

CREATE TABLE [ordenes_productos] (
  [id_orden_compra] INT NOT NULL,
  [id_producto] INT NOT NULL,
  [cantidad] INT NOT NULL,
  PRIMARY KEY ([id_orden_compra], [id_producto]),
  FOREIGN KEY ([id_orden_compra]) REFERENCES [ordenes_de_compra]([id_orden_compra]),
  FOREIGN KEY ([id_producto]) REFERENCES [productos]([id_producto])
);

CREATE TABLE [inventario] (
  [id_producto] INT PRIMARY KEY NOT NULL,
  [stock_inicial] INT NOT NULL,
  [stock_actual] INT NOT NULL,
  [saldo] INT NOT NULL,
  FOREIGN KEY ([id_producto]) REFERENCES [productos]([id_producto])
);

CREATE TABLE [historial_inventario] (
  [id_historial_inventario] INT PRIMARY KEY IDENTITY(1,1),
  [id_producto] INT NOT NULL,
  [cantidad] INT NOT NULL,
  [tipo_cambio] NVARCHAR(10) CHECK ([tipo_cambio] IN ('INGRESO', 'EGRESO')) NOT NULL,
  [fecha_cambio] DATETIME NOT NULL,
  FOREIGN KEY ([id_producto]) REFERENCES [productos]([id_producto])
);

CREATE TABLE [alertas_stock] (
  [id_alerta] INT PRIMARY KEY IDENTITY(1,1),
  [id_producto] INT NOT NULL,
  [nivel_minimo] INT NOT NULL,
  [fecha_alerta] DATETIME NOT NULL,
  FOREIGN KEY ([id_producto]) REFERENCES [productos]([id_producto])
);

CREATE TABLE [roles] (
  [id_rol] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_rol] NVARCHAR(255) NOT NULL,
  [descripcion_rol] NVARCHAR(MAX)
);

CREATE TABLE [usuarios] (
  [id_usuario] INT PRIMARY KEY IDENTITY(1,1),
  [nombre_usuario] NVARCHAR(255) NOT NULL,
  [clave_usuario] NVARCHAR(255) NOT NULL,
  [id_rol] INT NOT NULL,
  FOREIGN KEY ([id_rol]) REFERENCES [roles]([id_rol])
);

CREATE TABLE [registros_actividades] (
  [id_registro] INT PRIMARY KEY IDENTITY(1,1),
  [id_usuario] INT NOT NULL,
  [actividad] NVARCHAR(MAX) NOT NULL,
  [fecha_actividad] DATETIME NOT NULL,
  FOREIGN KEY ([id_usuario]) REFERENCES [usuarios]([id_usuario])
);