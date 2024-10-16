USE [master]
GO
/****** Object:  Database [DB_Sistema_Gestion_de_Inventario12]    Script Date: 17/06/2024 7:44:53 a. m. ******/
CREATE DATABASE [DB_Sistema_Gestion_de_Inventario12]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DB_Sistema_Gestion_de_Inventario12', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\DB_Sistema_Gestion_de_Inventario12.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DB_Sistema_Gestion_de_Inventario12_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\DB_Sistema_Gestion_de_Inventario12_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DB_Sistema_Gestion_de_Inventario12].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET ARITHABORT OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET  ENABLE_BROKER 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET RECOVERY FULL 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET  MULTI_USER 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'DB_Sistema_Gestion_de_Inventario12', N'ON'
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET QUERY_STORE = ON
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [DB_Sistema_Gestion_de_Inventario12]
GO
/****** Object:  Table [dbo].[Cajero]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cajero](
	[DNI_empleado] [int] NOT NULL,
	[Codigo_Cajero] [int] NOT NULL,
	[Turno_Trabajo_cajero] [nvarchar](256) NOT NULL,
 CONSTRAINT [Cajero_PK] PRIMARY KEY CLUSTERED 
(
	[DNI_empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categoria_producto]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria_producto](
	[Codigo_categoria_producto] [int] NOT NULL,
	[Nombre_categoria_producto] [nvarchar](256) NOT NULL,
	[Estado_categoria_producto] [nvarchar](256) NOT NULL,
	[Descripcion_categoria_producto] [nvarchar](256) NULL,
 CONSTRAINT [Categoria_producto_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_categoria_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ciudad]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ciudad](
	[Codigo_ciudad] [int] NOT NULL,
	[Nombre_ciudad] [nvarchar](256) NOT NULL,
	[Codigo_Postal_ciudad] [nvarchar](256) NULL,
	[Departamento_Codigo_departamento] [int] NOT NULL,
 CONSTRAINT [Ciudad_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_ciudad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[DNI_cliente] [int] NOT NULL,
	[Nombre_cliente] [nvarchar](256) NOT NULL,
	[Telefono_cliente] [nvarchar](256) NULL,
	[E-mail_cliente] [nvarchar](256) NULL,
 CONSTRAINT [Cliente_PK] PRIMARY KEY CLUSTERED 
(
	[DNI_cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departamento]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departamento](
	[Codigo_departamento] [int] NOT NULL,
	[Nombre_departamento] [nvarchar](256) NOT NULL,
	[Pais_Codigo_pais] [int] NOT NULL,
 CONSTRAINT [Departamento_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_departamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Detalle_producto]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Detalle_producto](
	[Codigo_detalle_producto] [int] NOT NULL,
	[Nombre_detalle_producto] [nvarchar](256) NOT NULL,
	[Color_detalle_producto] [nvarchar](256) NOT NULL,
	[Talla_detalle_procuto] [nvarchar](256) NOT NULL,
	[Stock_detalle_producto] [nvarchar](256) NULL,
	[Producto_Codigo_producto] [int] NOT NULL,
 CONSTRAINT [Detalle_producto_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_detalle_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Detalles_de_venta]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Detalles_de_venta](
	[Codigo_detalle_de_venta] [int] NOT NULL,
	[Cantidad_detalle_de_venta] [nvarchar](256) NOT NULL,
	[Estado_detalle_de_venta] [nvarchar](256) NOT NULL,
	[Precio_unitario_detalle_de_venta] [decimal](10, 2) NOT NULL,
	[Producto_Codigo_producto] [int] NOT NULL,
	[Factura_Codigo_factura] [int] NOT NULL,
 CONSTRAINT [Detalles_de_venta_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_detalle_de_venta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Devolucion]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Devolucion](
	[Codigo_devolucion] [nvarchar](256) NOT NULL,
	[Fecha_y_hora_devolucion] [datetime] NOT NULL,
	[Monto_devolucion] [decimal](10, 2) NOT NULL,
	[Estado_devolucion] [nvarchar](50) NOT NULL,
	[Motivo_devolcuion] [nvarchar](256) NULL,
	[Cliente_DNI_cliente] [int] NOT NULL,
 CONSTRAINT [Devolucion_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_devolucion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Devolucion_Producto]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Devolucion_Producto](
	[Devolucion_Codigo_devolucion] [nvarchar](256) NOT NULL,
	[Producto_Codigo_producto] [int] NOT NULL,
 CONSTRAINT [Devolucion_Producto_PK] PRIMARY KEY CLUSTERED 
(
	[Devolucion_Codigo_devolucion] ASC,
	[Producto_Codigo_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empleado]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleado](
	[DNI_empleado] [int] NOT NULL,
	[Nombre_empleado] [nvarchar](256) NOT NULL,
	[Apellidos_empleado] [nvarchar](256) NULL,
	[Telefono_empleado] [nvarchar](256) NOT NULL,
	[E-mail_empleado] [nvarchar](256) NULL,
	[Tienda_Codigo_tienda] [int] NOT NULL,
 CONSTRAINT [Empleado_PK] PRIMARY KEY CLUSTERED 
(
	[DNI_empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empresa]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empresa](
	[Codigo_empresa] [int] NOT NULL,
	[Nombre_empresa] [nvarchar](256) NOT NULL,
	[Direccion_empresa] [nvarchar](256) NOT NULL,
	[Telefono_empresa] [nvarchar](256) NULL,
	[E-mail_empresa] [nvarchar](256) NULL,
 CONSTRAINT [Empresa_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_empresa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Factura]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Factura](
	[Codigo_factura] [int] NOT NULL,
	[Fecha_emision_factura] [datetime] NOT NULL,
	[Subtotal_factura] [decimal](10, 2) NOT NULL,
	[Descuento_factura] [decimal](10, 2) NOT NULL,
	[Impuestos_factura] [decimal](10, 2) NOT NULL,
	[Total_factura] [decimal](10, 2) NOT NULL,
	[Empleado_DNI_empleado] [int] NOT NULL,
	[Transaccion_de_pago_Codigo_transaccion_de_pago] [int] NOT NULL,
 CONSTRAINT [Factura_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_factura] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Factura_Detalle_producto]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Factura_Detalle_producto](
	[Factura_Codigo_factura] [int] NOT NULL,
	[Detalle_producto_Codigo_detalle_producto] [int] NOT NULL,
 CONSTRAINT [Factura_Detalle_producto_PK] PRIMARY KEY CLUSTERED 
(
	[Factura_Codigo_factura] ASC,
	[Detalle_producto_Codigo_detalle_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Historial_de_inventario]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Historial_de_inventario](
	[Codigo_historial_de_inventario] [int] NOT NULL,
	[Cantidad_disponible_historial_de_inventario] [nvarchar](256) NOT NULL,
	[Fecha_y_Hora_historial_de_inventario] [datetime] NOT NULL,
	[Movimiento_de_inventario_Codigo_movimiento_de_inventario] [int] NOT NULL,
 CONSTRAINT [Historial_de_inventario_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_historial_de_inventario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Metodo_de_pago]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Metodo_de_pago](
	[Codigo_metodo_de_pago] [int] NOT NULL,
	[Nombre_metodo_de_pago] [nvarchar](256) NOT NULL,
	[Detalles_metodo_de_pago] [nvarchar](256) NULL,
 CONSTRAINT [Metodo_de_pago_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_metodo_de_pago] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Movimiento_de_inventario]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Movimiento_de_inventario](
	[Codigo_movimiento_de_inventario] [int] NOT NULL,
	[Tipo_de_movimiento_de_inventario] [nvarchar](256) NOT NULL,
	[Cantidad_movimiento_de_inventario] [nvarchar](256) NOT NULL,
	[Fecha_y_Hora_movimiento_de_inventario] [datetime] NOT NULL,
	[Empleado_DNI_empleado] [int] NOT NULL,
 CONSTRAINT [Movimiento_de_inventario_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_movimiento_de_inventario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orden_de_compra]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orden_de_compra](
	[Codigo_orden_de_compra] [int] NOT NULL,
	[Fecha_orden_de_compra] [nvarchar](256) NOT NULL,
	[Estado_orden_de_compra] [nvarchar](256) NOT NULL,
	[Monto_total_orden_de_compra] [decimal](10, 2) NOT NULL,
	[Cliente_DNI_cliente] [int] NOT NULL,
 CONSTRAINT [Orden_de_compra_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_orden_de_compra] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pais]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pais](
	[Codigo_pais] [int] NOT NULL,
	[Nombre_pais] [nvarchar](256) NOT NULL,
 CONSTRAINT [Pais_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_pais] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producto]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto](
	[Codigo_producto] [int] NOT NULL,
	[Nombre_producto] [nvarchar](256) NOT NULL,
	[Descripcion_producto] [nvarchar](256) NULL,
	[Precio_producto] [decimal](10, 2) NOT NULL,
	[Categoria_producto_Codigo_categoria_producto] [int] NOT NULL,
 CONSTRAINT [Producto_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producto_Ordendecompra]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto_Ordendecompra](
	[Producto_Codigo_producto] [int] NOT NULL,
	[Orden_de_compra_Codigo_orden_de_compra] [int] NOT NULL,
 CONSTRAINT [Producto_Ordendecompra_PK] PRIMARY KEY CLUSTERED 
(
	[Producto_Codigo_producto] ASC,
	[Orden_de_compra_Codigo_orden_de_compra] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producto_Proveedor]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto_Proveedor](
	[Producto_Codigo_producto] [int] NOT NULL,
	[Proveedor_Codigo_proveedor] [int] NOT NULL,
 CONSTRAINT [Producto_Proveedor_PK] PRIMARY KEY CLUSTERED 
(
	[Producto_Codigo_producto] ASC,
	[Proveedor_Codigo_proveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Proveedor]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Proveedor](
	[Codigo_proveedor] [int] NOT NULL,
	[Nombre_proveedor] [nvarchar](256) NOT NULL,
	[Contacto_proveedor] [nvarchar](256) NOT NULL,
	[E-mail_proveedor] [nvarchar](256) NULL,
 CONSTRAINT [Proveedor_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_proveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Supervisor]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Supervisor](
	[DNI_empleado] [int] NOT NULL,
	[Codigo_Supervisor] [int] NOT NULL,
	[Area_supervisor] [nvarchar](256) NOT NULL,
	[Numero_Empleados_supervisor] [nvarchar](256) NOT NULL,
 CONSTRAINT [Supervisor_PK] PRIMARY KEY CLUSTERED 
(
	[DNI_empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tienda]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tienda](
	[Codigo_tienda] [int] NOT NULL,
	[Nombre_tienda] [nvarchar](256) NOT NULL,
	[Gerente_tienda] [nvarchar](256) NOT NULL,
	[Telefono_tienda] [nvarchar](256) NOT NULL,
	[Ubicacion_tienda] [nvarchar](256) NOT NULL,
	[Empresa_Codigo_empresa] [int] NOT NULL,
	[Ciudad_Codigo_ciudad] [int] NOT NULL,
	[Producto_Codigo_producto] [int] NOT NULL,
 CONSTRAINT [Tienda_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_tienda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transaccion_de_pago]    Script Date: 17/06/2024 7:44:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transaccion_de_pago](
	[Codigo_transaccion_de_pago] [int] NOT NULL,
	[Fecha_y_Hora_transaccion_de_pago] [datetime] NOT NULL,
	[Estado_transaccion_de_pago] [nvarchar](256) NOT NULL,
	[Monto_transaccion_de_pago] [decimal](10, 2) NOT NULL,
	[Metodo_de_pago_Codigo_metodo_de_pago] [int] NOT NULL,
 CONSTRAINT [Transaccion_de_pago_PK] PRIMARY KEY CLUSTERED 
(
	[Codigo_transaccion_de_pago] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Cajero] ([DNI_empleado], [Codigo_Cajero], [Turno_Trabajo_cajero]) VALUES (1001, 2243, N'Mañana')
INSERT [dbo].[Cajero] ([DNI_empleado], [Codigo_Cajero], [Turno_Trabajo_cajero]) VALUES (1002, 2244, N'Noche')
INSERT [dbo].[Cajero] ([DNI_empleado], [Codigo_Cajero], [Turno_Trabajo_cajero]) VALUES (1003, 2245, N'Dia completo')
INSERT [dbo].[Cajero] ([DNI_empleado], [Codigo_Cajero], [Turno_Trabajo_cajero]) VALUES (1004, 2246, N'Tarde')
INSERT [dbo].[Cajero] ([DNI_empleado], [Codigo_Cajero], [Turno_Trabajo_cajero]) VALUES (1005, 2247, N'Dia completo')
GO
INSERT [dbo].[Categoria_producto] ([Codigo_categoria_producto], [Nombre_categoria_producto], [Estado_categoria_producto], [Descripcion_categoria_producto]) VALUES (1, N'Ropa', N'Activa', N'Ropa para toda ocasión')
INSERT [dbo].[Categoria_producto] ([Codigo_categoria_producto], [Nombre_categoria_producto], [Estado_categoria_producto], [Descripcion_categoria_producto]) VALUES (2, N'Hogar', N'Activa', N'Artículos para el hogar')
INSERT [dbo].[Categoria_producto] ([Codigo_categoria_producto], [Nombre_categoria_producto], [Estado_categoria_producto], [Descripcion_categoria_producto]) VALUES (3, N'Calzado', N'Activa', N'Zapatos y sandalias')
INSERT [dbo].[Categoria_producto] ([Codigo_categoria_producto], [Nombre_categoria_producto], [Estado_categoria_producto], [Descripcion_categoria_producto]) VALUES (4, N'Accesorios', N'Activa', N'Accesorios de moda')
INSERT [dbo].[Categoria_producto] ([Codigo_categoria_producto], [Nombre_categoria_producto], [Estado_categoria_producto], [Descripcion_categoria_producto]) VALUES (5, N'Ropa de Bebe', N'Activa', N'Ropa de niño para toda ocacion')
GO
INSERT [dbo].[Ciudad] ([Codigo_ciudad], [Nombre_ciudad], [Codigo_Postal_ciudad], [Departamento_Codigo_departamento]) VALUES (7521, N'Lima', N'15001', 6521)
INSERT [dbo].[Ciudad] ([Codigo_ciudad], [Nombre_ciudad], [Codigo_Postal_ciudad], [Departamento_Codigo_departamento]) VALUES (7522, N'Arequipa', N'04001', 6522)
INSERT [dbo].[Ciudad] ([Codigo_ciudad], [Nombre_ciudad], [Codigo_Postal_ciudad], [Departamento_Codigo_departamento]) VALUES (7523, N'Cusco', N'08001', 6523)
INSERT [dbo].[Ciudad] ([Codigo_ciudad], [Nombre_ciudad], [Codigo_Postal_ciudad], [Departamento_Codigo_departamento]) VALUES (7524, N'Trujillo', N'13001', 6524)
INSERT [dbo].[Ciudad] ([Codigo_ciudad], [Nombre_ciudad], [Codigo_Postal_ciudad], [Departamento_Codigo_departamento]) VALUES (7525, N'Cali', N'12001', 6525)
GO
INSERT [dbo].[Cliente] ([DNI_cliente], [Nombre_cliente], [Telefono_cliente], [E-mail_cliente]) VALUES (2001, N'Juan Perez', N'3208754690', N'juan.perez@example.com')
INSERT [dbo].[Cliente] ([DNI_cliente], [Nombre_cliente], [Telefono_cliente], [E-mail_cliente]) VALUES (2002, N'Maria Garcia', N'888888888', N'maria.garcia@example.com')
INSERT [dbo].[Cliente] ([DNI_cliente], [Nombre_cliente], [Telefono_cliente], [E-mail_cliente]) VALUES (2003, N'Carlos Sanchez', N'777777777', N'carlos.sanchez@example.com')
INSERT [dbo].[Cliente] ([DNI_cliente], [Nombre_cliente], [Telefono_cliente], [E-mail_cliente]) VALUES (2004, N'Luisa Fernandez', N'666666666', N'luisa.fernandez@example.com')
INSERT [dbo].[Cliente] ([DNI_cliente], [Nombre_cliente], [Telefono_cliente], [E-mail_cliente]) VALUES (2005, N'Pedro Ramirez', N'555555555', N'pedro.ramirez@example.com')
GO
INSERT [dbo].[Departamento] ([Codigo_departamento], [Nombre_departamento], [Pais_Codigo_pais]) VALUES (6521, N'Antioquia', 5421)
INSERT [dbo].[Departamento] ([Codigo_departamento], [Nombre_departamento], [Pais_Codigo_pais]) VALUES (6522, N'Cundinamarca', 5422)
INSERT [dbo].[Departamento] ([Codigo_departamento], [Nombre_departamento], [Pais_Codigo_pais]) VALUES (6523, N'Valle del Cauca
', 5423)
INSERT [dbo].[Departamento] ([Codigo_departamento], [Nombre_departamento], [Pais_Codigo_pais]) VALUES (6524, N'Santander
', 5424)
INSERT [dbo].[Departamento] ([Codigo_departamento], [Nombre_departamento], [Pais_Codigo_pais]) VALUES (6525, N'Boyacá', 5425)
GO
INSERT [dbo].[Detalle_producto] ([Codigo_detalle_producto], [Nombre_detalle_producto], [Color_detalle_producto], [Talla_detalle_procuto], [Stock_detalle_producto], [Producto_Codigo_producto]) VALUES (555, N'Camiseta Básica', N'Rojo', N'M', N'50', 321)
INSERT [dbo].[Detalle_producto] ([Codigo_detalle_producto], [Nombre_detalle_producto], [Color_detalle_producto], [Talla_detalle_procuto], [Stock_detalle_producto], [Producto_Codigo_producto]) VALUES (556, N'Pantalón Jeans', N'Azul', N'L', N'30', 322)
INSERT [dbo].[Detalle_producto] ([Codigo_detalle_producto], [Nombre_detalle_producto], [Color_detalle_producto], [Talla_detalle_procuto], [Stock_detalle_producto], [Producto_Codigo_producto]) VALUES (557, N'Chaqueta Deportiva', N'Negro', N'S', N'20', 323)
INSERT [dbo].[Detalle_producto] ([Codigo_detalle_producto], [Nombre_detalle_producto], [Color_detalle_producto], [Talla_detalle_procuto], [Stock_detalle_producto], [Producto_Codigo_producto]) VALUES (558, N'Zapatos Deportivos', N'Blanco', N'42', N'25', 324)
INSERT [dbo].[Detalle_producto] ([Codigo_detalle_producto], [Nombre_detalle_producto], [Color_detalle_producto], [Talla_detalle_procuto], [Stock_detalle_producto], [Producto_Codigo_producto]) VALUES (559, N'Gorra Casual', N'Gris', N'Única', N'100', 325)
GO
INSERT [dbo].[Detalles_de_venta] ([Codigo_detalle_de_venta], [Cantidad_detalle_de_venta], [Estado_detalle_de_venta], [Precio_unitario_detalle_de_venta], [Producto_Codigo_producto], [Factura_Codigo_factura]) VALUES (10001, N'3', N'Completado', CAST(1200000.00 AS Decimal(10, 2)), 321, 301)
INSERT [dbo].[Detalles_de_venta] ([Codigo_detalle_de_venta], [Cantidad_detalle_de_venta], [Estado_detalle_de_venta], [Precio_unitario_detalle_de_venta], [Producto_Codigo_producto], [Factura_Codigo_factura]) VALUES (10002, N'1', N'Pendiente', CAST(450000.00 AS Decimal(10, 2)), 322, 302)
INSERT [dbo].[Detalles_de_venta] ([Codigo_detalle_de_venta], [Cantidad_detalle_de_venta], [Estado_detalle_de_venta], [Precio_unitario_detalle_de_venta], [Producto_Codigo_producto], [Factura_Codigo_factura]) VALUES (10003, N'2', N'Completado', CAST(800000.00 AS Decimal(10, 2)), 323, 303)
INSERT [dbo].[Detalles_de_venta] ([Codigo_detalle_de_venta], [Cantidad_detalle_de_venta], [Estado_detalle_de_venta], [Precio_unitario_detalle_de_venta], [Producto_Codigo_producto], [Factura_Codigo_factura]) VALUES (10004, N'5', N'Completado', CAST(1500000.00 AS Decimal(10, 2)), 324, 304)
INSERT [dbo].[Detalles_de_venta] ([Codigo_detalle_de_venta], [Cantidad_detalle_de_venta], [Estado_detalle_de_venta], [Precio_unitario_detalle_de_venta], [Producto_Codigo_producto], [Factura_Codigo_factura]) VALUES (10005, N'4', N'Pendiente', CAST(1000000.00 AS Decimal(10, 2)), 325, 304)
GO
INSERT [dbo].[Devolucion] ([Codigo_devolucion], [Fecha_y_hora_devolucion], [Monto_devolucion], [Estado_devolucion], [Motivo_devolcuion], [Cliente_DNI_cliente]) VALUES (N'DEV001', CAST(N'2023-01-01T10:00:00.000' AS DateTime), CAST(30000.00 AS Decimal(10, 2)), N'Procesada', N'Producto defectuoso', 2001)
INSERT [dbo].[Devolucion] ([Codigo_devolucion], [Fecha_y_hora_devolucion], [Monto_devolucion], [Estado_devolucion], [Motivo_devolcuion], [Cliente_DNI_cliente]) VALUES (N'DEV002', CAST(N'2023-02-01T11:00:00.000' AS DateTime), CAST(25000.00 AS Decimal(10, 2)), N'Procesada', N'No era lo que esperaba', 2002)
INSERT [dbo].[Devolucion] ([Codigo_devolucion], [Fecha_y_hora_devolucion], [Monto_devolucion], [Estado_devolucion], [Motivo_devolcuion], [Cliente_DNI_cliente]) VALUES (N'DEV003', CAST(N'2023-03-01T12:00:00.000' AS DateTime), CAST(10000.00 AS Decimal(10, 2)), N'Procesada', N'Talla incorrecta', 2003)
INSERT [dbo].[Devolucion] ([Codigo_devolucion], [Fecha_y_hora_devolucion], [Monto_devolucion], [Estado_devolucion], [Motivo_devolcuion], [Cliente_DNI_cliente]) VALUES (N'DEV004', CAST(N'2023-04-01T13:00:00.000' AS DateTime), CAST(50000.00 AS Decimal(10, 2)), N'Procesada', N'Producto dañado', 2004)
INSERT [dbo].[Devolucion] ([Codigo_devolucion], [Fecha_y_hora_devolucion], [Monto_devolucion], [Estado_devolucion], [Motivo_devolcuion], [Cliente_DNI_cliente]) VALUES (N'DEV005', CAST(N'2023-05-01T14:00:00.000' AS DateTime), CAST(60000.00 AS Decimal(10, 2)), N'Procesada', N'Color diferente', 2005)
GO
INSERT [dbo].[Devolucion_Producto] ([Devolucion_Codigo_devolucion], [Producto_Codigo_producto]) VALUES (N'DEV001', 321)
INSERT [dbo].[Devolucion_Producto] ([Devolucion_Codigo_devolucion], [Producto_Codigo_producto]) VALUES (N'DEV002', 322)
INSERT [dbo].[Devolucion_Producto] ([Devolucion_Codigo_devolucion], [Producto_Codigo_producto]) VALUES (N'DEV003', 323)
INSERT [dbo].[Devolucion_Producto] ([Devolucion_Codigo_devolucion], [Producto_Codigo_producto]) VALUES (N'DEV004', 324)
INSERT [dbo].[Devolucion_Producto] ([Devolucion_Codigo_devolucion], [Producto_Codigo_producto]) VALUES (N'DEV005', 325)
GO
INSERT [dbo].[Empleado] ([DNI_empleado], [Nombre_empleado], [Apellidos_empleado], [Telefono_empleado], [E-mail_empleado], [Tienda_Codigo_tienda]) VALUES (1001, N'Roberto', N'Gomez', N'987654321', N'juan.perez@email.com', 2035)
INSERT [dbo].[Empleado] ([DNI_empleado], [Nombre_empleado], [Apellidos_empleado], [Telefono_empleado], [E-mail_empleado], [Tienda_Codigo_tienda]) VALUES (1002, N'María', N'Gómez', N'3202345678', N'maria.gomez@email.com', 2036)
INSERT [dbo].[Empleado] ([DNI_empleado], [Nombre_empleado], [Apellidos_empleado], [Telefono_empleado], [E-mail_empleado], [Tienda_Codigo_tienda]) VALUES (1003, N'Carlos', N'Rodríguez', N'3203456789', N'carlos.rodriguez@email.com', 2037)
INSERT [dbo].[Empleado] ([DNI_empleado], [Nombre_empleado], [Apellidos_empleado], [Telefono_empleado], [E-mail_empleado], [Tienda_Codigo_tienda]) VALUES (1004, N'Ana', N'Martínez', N'3204567890', N'ana.martinez@email.com', 2038)
INSERT [dbo].[Empleado] ([DNI_empleado], [Nombre_empleado], [Apellidos_empleado], [Telefono_empleado], [E-mail_empleado], [Tienda_Codigo_tienda]) VALUES (1005, N'Luis', N'Hernández', N'3205678901', N'luis.hernandez@email.com', 2039)
GO
INSERT [dbo].[Empresa] ([Codigo_empresa], [Nombre_empresa], [Direccion_empresa], [Telefono_empresa], [E-mail_empresa]) VALUES (8521, N'Empresa A', N'Calle 1 #1-01', N'3001234567', N'contacto@empresaA.com')
INSERT [dbo].[Empresa] ([Codigo_empresa], [Nombre_empresa], [Direccion_empresa], [Telefono_empresa], [E-mail_empresa]) VALUES (8522, N'Empresa B', N'Calle 2 #2-02', N'3002345678', N'contacto@empresaB.com')
INSERT [dbo].[Empresa] ([Codigo_empresa], [Nombre_empresa], [Direccion_empresa], [Telefono_empresa], [E-mail_empresa]) VALUES (8523, N'Empresa C', N'Calle 3 #3-03', N'Calle 3 #3-03', N'contacto@empresaC.com')
INSERT [dbo].[Empresa] ([Codigo_empresa], [Nombre_empresa], [Direccion_empresa], [Telefono_empresa], [E-mail_empresa]) VALUES (8524, N'Empresa D', N'Calle 4 #4-04', N'3004567890', N'contacto@empresaD.com')
INSERT [dbo].[Empresa] ([Codigo_empresa], [Nombre_empresa], [Direccion_empresa], [Telefono_empresa], [E-mail_empresa]) VALUES (8525, N'Empresa E', N'Calle 5 #5-05', N'3005678901', N'contacto@empresaE.com')
GO
INSERT [dbo].[Factura] ([Codigo_factura], [Fecha_emision_factura], [Subtotal_factura], [Descuento_factura], [Impuestos_factura], [Total_factura], [Empleado_DNI_empleado], [Transaccion_de_pago_Codigo_transaccion_de_pago]) VALUES (301, CAST(N'2024-06-16T08:00:00.000' AS DateTime), CAST(125000.00 AS Decimal(10, 2)), CAST(25000.00 AS Decimal(10, 2)), CAST(18750.00 AS Decimal(10, 2)), CAST(137750.00 AS Decimal(10, 2)), 1001, 201)
INSERT [dbo].[Factura] ([Codigo_factura], [Fecha_emision_factura], [Subtotal_factura], [Descuento_factura], [Impuestos_factura], [Total_factura], [Empleado_DNI_empleado], [Transaccion_de_pago_Codigo_transaccion_de_pago]) VALUES (302, CAST(N'2024-06-16T09:30:00.000' AS DateTime), CAST(180000.00 AS Decimal(10, 2)), CAST(36000.00 AS Decimal(10, 2)), CAST(27000.00 AS Decimal(10, 2)), CAST(217000.00 AS Decimal(10, 2)), 1002, 202)
INSERT [dbo].[Factura] ([Codigo_factura], [Fecha_emision_factura], [Subtotal_factura], [Descuento_factura], [Impuestos_factura], [Total_factura], [Empleado_DNI_empleado], [Transaccion_de_pago_Codigo_transaccion_de_pago]) VALUES (303, CAST(N'2024-06-16T10:45:00.000' AS DateTime), CAST(95000.00 AS Decimal(10, 2)), CAST(19000.00 AS Decimal(10, 2)), CAST(14250.00 AS Decimal(10, 2)), CAST(90250.00 AS Decimal(10, 2)), 1003, 203)
INSERT [dbo].[Factura] ([Codigo_factura], [Fecha_emision_factura], [Subtotal_factura], [Descuento_factura], [Impuestos_factura], [Total_factura], [Empleado_DNI_empleado], [Transaccion_de_pago_Codigo_transaccion_de_pago]) VALUES (304, CAST(N'2024-06-16T12:15:00.000' AS DateTime), CAST(145000.00 AS Decimal(10, 2)), CAST(29000.00 AS Decimal(10, 2)), CAST(21750.00 AS Decimal(10, 2)), CAST(171750.00 AS Decimal(10, 2)), 1004, 204)
INSERT [dbo].[Factura] ([Codigo_factura], [Fecha_emision_factura], [Subtotal_factura], [Descuento_factura], [Impuestos_factura], [Total_factura], [Empleado_DNI_empleado], [Transaccion_de_pago_Codigo_transaccion_de_pago]) VALUES (305, CAST(N'2024-06-16T14:00:00.000' AS DateTime), CAST(210000.00 AS Decimal(10, 2)), CAST(42000.00 AS Decimal(10, 2)), CAST(31500.00 AS Decimal(10, 2)), CAST(252500.00 AS Decimal(10, 2)), 1005, 205)
GO
INSERT [dbo].[Factura_Detalle_producto] ([Factura_Codigo_factura], [Detalle_producto_Codigo_detalle_producto]) VALUES (301, 555)
INSERT [dbo].[Factura_Detalle_producto] ([Factura_Codigo_factura], [Detalle_producto_Codigo_detalle_producto]) VALUES (302, 556)
INSERT [dbo].[Factura_Detalle_producto] ([Factura_Codigo_factura], [Detalle_producto_Codigo_detalle_producto]) VALUES (303, 557)
INSERT [dbo].[Factura_Detalle_producto] ([Factura_Codigo_factura], [Detalle_producto_Codigo_detalle_producto]) VALUES (304, 558)
INSERT [dbo].[Factura_Detalle_producto] ([Factura_Codigo_factura], [Detalle_producto_Codigo_detalle_producto]) VALUES (305, 559)
GO
INSERT [dbo].[Historial_de_inventario] ([Codigo_historial_de_inventario], [Cantidad_disponible_historial_de_inventario], [Fecha_y_Hora_historial_de_inventario], [Movimiento_de_inventario_Codigo_movimiento_de_inventario]) VALUES (990, N'150', CAST(N'2024-06-16T08:00:00.000' AS DateTime), 4011)
INSERT [dbo].[Historial_de_inventario] ([Codigo_historial_de_inventario], [Cantidad_disponible_historial_de_inventario], [Fecha_y_Hora_historial_de_inventario], [Movimiento_de_inventario_Codigo_movimiento_de_inventario]) VALUES (991, N'100', CAST(N'2024-06-16T09:30:00.000' AS DateTime), 4022)
INSERT [dbo].[Historial_de_inventario] ([Codigo_historial_de_inventario], [Cantidad_disponible_historial_de_inventario], [Fecha_y_Hora_historial_de_inventario], [Movimiento_de_inventario_Codigo_movimiento_de_inventario]) VALUES (992, N'175', CAST(N'2024-06-16T10:45:00.000' AS DateTime), 4033)
INSERT [dbo].[Historial_de_inventario] ([Codigo_historial_de_inventario], [Cantidad_disponible_historial_de_inventario], [Fecha_y_Hora_historial_de_inventario], [Movimiento_de_inventario_Codigo_movimiento_de_inventario]) VALUES (993, N'375', CAST(N'2024-06-16T12:15:00.000' AS DateTime), 4044)
INSERT [dbo].[Historial_de_inventario] ([Codigo_historial_de_inventario], [Cantidad_disponible_historial_de_inventario], [Fecha_y_Hora_historial_de_inventario], [Movimiento_de_inventario_Codigo_movimiento_de_inventario]) VALUES (994, N'255', CAST(N'2024-06-16T14:00:00.000' AS DateTime), 4055)
GO
INSERT [dbo].[Metodo_de_pago] ([Codigo_metodo_de_pago], [Nombre_metodo_de_pago], [Detalles_metodo_de_pago]) VALUES (5030, N'Tarjeta de crédito', N'Visa')
INSERT [dbo].[Metodo_de_pago] ([Codigo_metodo_de_pago], [Nombre_metodo_de_pago], [Detalles_metodo_de_pago]) VALUES (5031, N'Tarjeta de débito', N'MasterCard')
INSERT [dbo].[Metodo_de_pago] ([Codigo_metodo_de_pago], [Nombre_metodo_de_pago], [Detalles_metodo_de_pago]) VALUES (5032, N'Transferencia bancaria', N'Banco XYZ')
INSERT [dbo].[Metodo_de_pago] ([Codigo_metodo_de_pago], [Nombre_metodo_de_pago], [Detalles_metodo_de_pago]) VALUES (5033, N'Efectivo', N'Moneda local')
INSERT [dbo].[Metodo_de_pago] ([Codigo_metodo_de_pago], [Nombre_metodo_de_pago], [Detalles_metodo_de_pago]) VALUES (5034, N'Cheque', N'Nombre del banco')
GO
INSERT [dbo].[Movimiento_de_inventario] ([Codigo_movimiento_de_inventario], [Tipo_de_movimiento_de_inventario], [Cantidad_movimiento_de_inventario], [Fecha_y_Hora_movimiento_de_inventario], [Empleado_DNI_empleado]) VALUES (4011, N'Entrada', N'100', CAST(N'2024-06-16T08:00:00.000' AS DateTime), 1001)
INSERT [dbo].[Movimiento_de_inventario] ([Codigo_movimiento_de_inventario], [Tipo_de_movimiento_de_inventario], [Cantidad_movimiento_de_inventario], [Fecha_y_Hora_movimiento_de_inventario], [Empleado_DNI_empleado]) VALUES (4022, N'Salida', N'50', CAST(N'2024-06-16T09:30:00.000' AS DateTime), 1002)
INSERT [dbo].[Movimiento_de_inventario] ([Codigo_movimiento_de_inventario], [Tipo_de_movimiento_de_inventario], [Cantidad_movimiento_de_inventario], [Fecha_y_Hora_movimiento_de_inventario], [Empleado_DNI_empleado]) VALUES (4033, N'Entrada', N'75', CAST(N'2024-06-16T10:45:00.000' AS DateTime), 1003)
INSERT [dbo].[Movimiento_de_inventario] ([Codigo_movimiento_de_inventario], [Tipo_de_movimiento_de_inventario], [Cantidad_movimiento_de_inventario], [Fecha_y_Hora_movimiento_de_inventario], [Empleado_DNI_empleado]) VALUES (4044, N'Entrada', N'200', CAST(N'2024-06-16T12:15:00.000' AS DateTime), 1004)
INSERT [dbo].[Movimiento_de_inventario] ([Codigo_movimiento_de_inventario], [Tipo_de_movimiento_de_inventario], [Cantidad_movimiento_de_inventario], [Fecha_y_Hora_movimiento_de_inventario], [Empleado_DNI_empleado]) VALUES (4055, N'Salida', N'120', CAST(N'2024-06-16T14:00:00.000' AS DateTime), 1005)
GO
INSERT [dbo].[Orden_de_compra] ([Codigo_orden_de_compra], [Fecha_orden_de_compra], [Estado_orden_de_compra], [Monto_total_orden_de_compra], [Cliente_DNI_cliente]) VALUES (6015, N'2024-06-16 08:00:00', N'Pendiente', CAST(50000000.00 AS Decimal(10, 2)), 2001)
INSERT [dbo].[Orden_de_compra] ([Codigo_orden_de_compra], [Fecha_orden_de_compra], [Estado_orden_de_compra], [Monto_total_orden_de_compra], [Cliente_DNI_cliente]) VALUES (6016, N'2024-06-16 09:30:00', N'Completada', CAST(75000000.00 AS Decimal(10, 2)), 2002)
INSERT [dbo].[Orden_de_compra] ([Codigo_orden_de_compra], [Fecha_orden_de_compra], [Estado_orden_de_compra], [Monto_total_orden_de_compra], [Cliente_DNI_cliente]) VALUES (6017, N'2024-06-16 10:45:00', N'Pendiente', CAST(30000000.00 AS Decimal(10, 2)), 2003)
INSERT [dbo].[Orden_de_compra] ([Codigo_orden_de_compra], [Fecha_orden_de_compra], [Estado_orden_de_compra], [Monto_total_orden_de_compra], [Cliente_DNI_cliente]) VALUES (6018, N'2024-06-16 12:15:00', N'Completada', CAST(90000000.00 AS Decimal(10, 2)), 2004)
INSERT [dbo].[Orden_de_compra] ([Codigo_orden_de_compra], [Fecha_orden_de_compra], [Estado_orden_de_compra], [Monto_total_orden_de_compra], [Cliente_DNI_cliente]) VALUES (6019, N'N2024-06-16 2024-06-16 14:00:00', N'Pendiente', CAST(60000000.00 AS Decimal(10, 2)), 2005)
GO
INSERT [dbo].[Pais] ([Codigo_pais], [Nombre_pais]) VALUES (5421, N'Colombia')
INSERT [dbo].[Pais] ([Codigo_pais], [Nombre_pais]) VALUES (5422, N'Argentina')
INSERT [dbo].[Pais] ([Codigo_pais], [Nombre_pais]) VALUES (5423, N'Peru')
INSERT [dbo].[Pais] ([Codigo_pais], [Nombre_pais]) VALUES (5424, N'Chile')
INSERT [dbo].[Pais] ([Codigo_pais], [Nombre_pais]) VALUES (5425, N'Brasil')
GO
INSERT [dbo].[Producto] ([Codigo_producto], [Nombre_producto], [Descripcion_producto], [Precio_producto], [Categoria_producto_Codigo_categoria_producto]) VALUES (321, N'Camiseta Roja', N'Camiseta de algodón', CAST(15000.00 AS Decimal(10, 2)), 1)
INSERT [dbo].[Producto] ([Codigo_producto], [Nombre_producto], [Descripcion_producto], [Precio_producto], [Categoria_producto_Codigo_categoria_producto]) VALUES (322, N'Bolso Blanco', N'Bolso de piel', CAST(500000.00 AS Decimal(10, 2)), 2)
INSERT [dbo].[Producto] ([Codigo_producto], [Nombre_producto], [Descripcion_producto], [Precio_producto], [Categoria_producto_Codigo_categoria_producto]) VALUES (323, N'Guantes Negros', N'Guantes de lana', CAST(45000.00 AS Decimal(10, 2)), 3)
INSERT [dbo].[Producto] ([Codigo_producto], [Nombre_producto], [Descripcion_producto], [Precio_producto], [Categoria_producto_Codigo_categoria_producto]) VALUES (324, N'Chaleco Azul', N'Chaleco de algodón', CAST(60000.00 AS Decimal(10, 2)), 4)
INSERT [dbo].[Producto] ([Codigo_producto], [Nombre_producto], [Descripcion_producto], [Precio_producto], [Categoria_producto_Codigo_categoria_producto]) VALUES (325, N'Zapatos Negros', N'Zapatos de cuero', CAST(100000.00 AS Decimal(10, 2)), 5)
GO
INSERT [dbo].[Producto_Ordendecompra] ([Producto_Codigo_producto], [Orden_de_compra_Codigo_orden_de_compra]) VALUES (321, 6015)
INSERT [dbo].[Producto_Ordendecompra] ([Producto_Codigo_producto], [Orden_de_compra_Codigo_orden_de_compra]) VALUES (322, 6016)
INSERT [dbo].[Producto_Ordendecompra] ([Producto_Codigo_producto], [Orden_de_compra_Codigo_orden_de_compra]) VALUES (323, 6017)
INSERT [dbo].[Producto_Ordendecompra] ([Producto_Codigo_producto], [Orden_de_compra_Codigo_orden_de_compra]) VALUES (324, 6018)
INSERT [dbo].[Producto_Ordendecompra] ([Producto_Codigo_producto], [Orden_de_compra_Codigo_orden_de_compra]) VALUES (325, 6019)
GO
INSERT [dbo].[Producto_Proveedor] ([Producto_Codigo_producto], [Proveedor_Codigo_proveedor]) VALUES (321, 100001)
INSERT [dbo].[Producto_Proveedor] ([Producto_Codigo_producto], [Proveedor_Codigo_proveedor]) VALUES (322, 100002)
INSERT [dbo].[Producto_Proveedor] ([Producto_Codigo_producto], [Proveedor_Codigo_proveedor]) VALUES (323, 100003)
INSERT [dbo].[Producto_Proveedor] ([Producto_Codigo_producto], [Proveedor_Codigo_proveedor]) VALUES (324, 100004)
INSERT [dbo].[Producto_Proveedor] ([Producto_Codigo_producto], [Proveedor_Codigo_proveedor]) VALUES (325, 100005)
GO
INSERT [dbo].[Proveedor] ([Codigo_proveedor], [Nombre_proveedor], [Contacto_proveedor], [E-mail_proveedor]) VALUES (100001, N'Proveedor A', N'Juan Pérez', N'proveedora@example.com')
INSERT [dbo].[Proveedor] ([Codigo_proveedor], [Nombre_proveedor], [Contacto_proveedor], [E-mail_proveedor]) VALUES (100002, N'Proveedor B', N'María Gómez', N'proveedorb@example.com')
INSERT [dbo].[Proveedor] ([Codigo_proveedor], [Nombre_proveedor], [Contacto_proveedor], [E-mail_proveedor]) VALUES (100003, N'Proveedor C', N'Carlos Martínez', N'proveedorc@example.com')
INSERT [dbo].[Proveedor] ([Codigo_proveedor], [Nombre_proveedor], [Contacto_proveedor], [E-mail_proveedor]) VALUES (100004, N'Proveedor D', N'Ana López', N'proveedord@example.com')
INSERT [dbo].[Proveedor] ([Codigo_proveedor], [Nombre_proveedor], [Contacto_proveedor], [E-mail_proveedor]) VALUES (100005, N'Proveedor E', N'Pedro Ramírez', N'proveedore@example.com')
GO
INSERT [dbo].[Supervisor] ([DNI_empleado], [Codigo_Supervisor], [Area_supervisor], [Numero_Empleados_supervisor]) VALUES (1001, 20143, N'Ventas', N'1')
INSERT [dbo].[Supervisor] ([DNI_empleado], [Codigo_Supervisor], [Area_supervisor], [Numero_Empleados_supervisor]) VALUES (1002, 20144, N'Almacén', N'1')
GO
INSERT [dbo].[Tienda] ([Codigo_tienda], [Nombre_tienda], [Gerente_tienda], [Telefono_tienda], [Ubicacion_tienda], [Empresa_Codigo_empresa], [Ciudad_Codigo_ciudad], [Producto_Codigo_producto]) VALUES (2035, N'Tienda 1', N'Gerente 1', N'3101234567', N'Ubicación 1', 8521, 7521, 321)
INSERT [dbo].[Tienda] ([Codigo_tienda], [Nombre_tienda], [Gerente_tienda], [Telefono_tienda], [Ubicacion_tienda], [Empresa_Codigo_empresa], [Ciudad_Codigo_ciudad], [Producto_Codigo_producto]) VALUES (2036, N'Tienda 2', N'Gerente 2', N'3102345678', N'Ubicación 2', 8522, 7522, 322)
INSERT [dbo].[Tienda] ([Codigo_tienda], [Nombre_tienda], [Gerente_tienda], [Telefono_tienda], [Ubicacion_tienda], [Empresa_Codigo_empresa], [Ciudad_Codigo_ciudad], [Producto_Codigo_producto]) VALUES (2037, N'Tienda 3', N'Gerente 3', N'3103456789', N'Ubicación 3', 8523, 7523, 323)
INSERT [dbo].[Tienda] ([Codigo_tienda], [Nombre_tienda], [Gerente_tienda], [Telefono_tienda], [Ubicacion_tienda], [Empresa_Codigo_empresa], [Ciudad_Codigo_ciudad], [Producto_Codigo_producto]) VALUES (2038, N'Tienda 4', N'Gerente 4', N'3104567890', N'Ubicacion 4', 8524, 7524, 324)
INSERT [dbo].[Tienda] ([Codigo_tienda], [Nombre_tienda], [Gerente_tienda], [Telefono_tienda], [Ubicacion_tienda], [Empresa_Codigo_empresa], [Ciudad_Codigo_ciudad], [Producto_Codigo_producto]) VALUES (2039, N'Tienda 5', N'Gerente 5', N'3105678901', N'Ubicacion 5', 8525, 7525, 325)
GO
INSERT [dbo].[Transaccion_de_pago] ([Codigo_transaccion_de_pago], [Fecha_y_Hora_transaccion_de_pago], [Estado_transaccion_de_pago], [Monto_transaccion_de_pago], [Metodo_de_pago_Codigo_metodo_de_pago]) VALUES (201, CAST(N'2024-06-16T10:30:00.000' AS DateTime), N'Completado', CAST(100000.00 AS Decimal(10, 2)), 5030)
INSERT [dbo].[Transaccion_de_pago] ([Codigo_transaccion_de_pago], [Fecha_y_Hora_transaccion_de_pago], [Estado_transaccion_de_pago], [Monto_transaccion_de_pago], [Metodo_de_pago_Codigo_metodo_de_pago]) VALUES (202, CAST(N'2024-06-16T11:15:00.000' AS DateTime), N'Pendiente', CAST(200000.00 AS Decimal(10, 2)), 5031)
INSERT [dbo].[Transaccion_de_pago] ([Codigo_transaccion_de_pago], [Fecha_y_Hora_transaccion_de_pago], [Estado_transaccion_de_pago], [Monto_transaccion_de_pago], [Metodo_de_pago_Codigo_metodo_de_pago]) VALUES (203, CAST(N'2024-06-16T12:00:00.000' AS DateTime), N'Fallido', CAST(150000.00 AS Decimal(10, 2)), 5032)
INSERT [dbo].[Transaccion_de_pago] ([Codigo_transaccion_de_pago], [Fecha_y_Hora_transaccion_de_pago], [Estado_transaccion_de_pago], [Monto_transaccion_de_pago], [Metodo_de_pago_Codigo_metodo_de_pago]) VALUES (204, CAST(N'2024-06-16T13:45:00.000' AS DateTime), N'Completado', CAST(50000.00 AS Decimal(10, 2)), 5033)
INSERT [dbo].[Transaccion_de_pago] ([Codigo_transaccion_de_pago], [Fecha_y_Hora_transaccion_de_pago], [Estado_transaccion_de_pago], [Monto_transaccion_de_pago], [Metodo_de_pago_Codigo_metodo_de_pago]) VALUES (205, CAST(N'2024-06-16T14:30:00.000' AS DateTime), N'Pendiente', CAST(90000.00 AS Decimal(10, 2)), 5034)
GO
/****** Object:  Index [Cajero_PKv1]    Script Date: 17/06/2024 7:44:54 a. m. ******/
ALTER TABLE [dbo].[Cajero] ADD  CONSTRAINT [Cajero_PKv1] UNIQUE NONCLUSTERED 
(
	[Codigo_Cajero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [Supervisor_PKv1]    Script Date: 17/06/2024 7:44:54 a. m. ******/
ALTER TABLE [dbo].[Supervisor] ADD  CONSTRAINT [Supervisor_PKv1] UNIQUE NONCLUSTERED 
(
	[Codigo_Supervisor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cajero]  WITH CHECK ADD  CONSTRAINT [Cajero_Empleado_FK] FOREIGN KEY([DNI_empleado])
REFERENCES [dbo].[Empleado] ([DNI_empleado])
GO
ALTER TABLE [dbo].[Cajero] CHECK CONSTRAINT [Cajero_Empleado_FK]
GO
ALTER TABLE [dbo].[Ciudad]  WITH CHECK ADD  CONSTRAINT [Ciudad_Departamento_FK] FOREIGN KEY([Departamento_Codigo_departamento])
REFERENCES [dbo].[Departamento] ([Codigo_departamento])
GO
ALTER TABLE [dbo].[Ciudad] CHECK CONSTRAINT [Ciudad_Departamento_FK]
GO
ALTER TABLE [dbo].[Departamento]  WITH CHECK ADD  CONSTRAINT [Departamento_Pais_FK] FOREIGN KEY([Pais_Codigo_pais])
REFERENCES [dbo].[Pais] ([Codigo_pais])
GO
ALTER TABLE [dbo].[Departamento] CHECK CONSTRAINT [Departamento_Pais_FK]
GO
ALTER TABLE [dbo].[Detalle_producto]  WITH CHECK ADD  CONSTRAINT [Detalle_producto_Producto_FK] FOREIGN KEY([Producto_Codigo_producto])
REFERENCES [dbo].[Producto] ([Codigo_producto])
GO
ALTER TABLE [dbo].[Detalle_producto] CHECK CONSTRAINT [Detalle_producto_Producto_FK]
GO
ALTER TABLE [dbo].[Detalles_de_venta]  WITH CHECK ADD  CONSTRAINT [Detalles_de_venta_Factura_FK] FOREIGN KEY([Factura_Codigo_factura])
REFERENCES [dbo].[Factura] ([Codigo_factura])
GO
ALTER TABLE [dbo].[Detalles_de_venta] CHECK CONSTRAINT [Detalles_de_venta_Factura_FK]
GO
ALTER TABLE [dbo].[Detalles_de_venta]  WITH CHECK ADD  CONSTRAINT [Detalles_de_venta_Producto_FK] FOREIGN KEY([Producto_Codigo_producto])
REFERENCES [dbo].[Producto] ([Codigo_producto])
GO
ALTER TABLE [dbo].[Detalles_de_venta] CHECK CONSTRAINT [Detalles_de_venta_Producto_FK]
GO
ALTER TABLE [dbo].[Devolucion]  WITH CHECK ADD  CONSTRAINT [Devolucion_Cliente_FK] FOREIGN KEY([Cliente_DNI_cliente])
REFERENCES [dbo].[Cliente] ([DNI_cliente])
GO
ALTER TABLE [dbo].[Devolucion] CHECK CONSTRAINT [Devolucion_Cliente_FK]
GO
ALTER TABLE [dbo].[Devolucion_Producto]  WITH CHECK ADD  CONSTRAINT [Devolucion_Producto_Devolucion_FK] FOREIGN KEY([Devolucion_Codigo_devolucion])
REFERENCES [dbo].[Devolucion] ([Codigo_devolucion])
GO
ALTER TABLE [dbo].[Devolucion_Producto] CHECK CONSTRAINT [Devolucion_Producto_Devolucion_FK]
GO
ALTER TABLE [dbo].[Devolucion_Producto]  WITH CHECK ADD  CONSTRAINT [Devolucion_Producto_Producto_FK] FOREIGN KEY([Producto_Codigo_producto])
REFERENCES [dbo].[Producto] ([Codigo_producto])
GO
ALTER TABLE [dbo].[Devolucion_Producto] CHECK CONSTRAINT [Devolucion_Producto_Producto_FK]
GO
ALTER TABLE [dbo].[Empleado]  WITH CHECK ADD  CONSTRAINT [Empleado_Tienda_FK] FOREIGN KEY([Tienda_Codigo_tienda])
REFERENCES [dbo].[Tienda] ([Codigo_tienda])
GO
ALTER TABLE [dbo].[Empleado] CHECK CONSTRAINT [Empleado_Tienda_FK]
GO
ALTER TABLE [dbo].[Factura]  WITH CHECK ADD  CONSTRAINT [Factura_Empleado_FK] FOREIGN KEY([Empleado_DNI_empleado])
REFERENCES [dbo].[Empleado] ([DNI_empleado])
GO
ALTER TABLE [dbo].[Factura] CHECK CONSTRAINT [Factura_Empleado_FK]
GO
ALTER TABLE [dbo].[Factura]  WITH CHECK ADD  CONSTRAINT [Factura_Transaccion_de_pago_FK] FOREIGN KEY([Transaccion_de_pago_Codigo_transaccion_de_pago])
REFERENCES [dbo].[Transaccion_de_pago] ([Codigo_transaccion_de_pago])
GO
ALTER TABLE [dbo].[Factura] CHECK CONSTRAINT [Factura_Transaccion_de_pago_FK]
GO
ALTER TABLE [dbo].[Factura_Detalle_producto]  WITH CHECK ADD  CONSTRAINT [Factura_Detalle_producto_Detalle_producto_FK] FOREIGN KEY([Detalle_producto_Codigo_detalle_producto])
REFERENCES [dbo].[Detalle_producto] ([Codigo_detalle_producto])
GO
ALTER TABLE [dbo].[Factura_Detalle_producto] CHECK CONSTRAINT [Factura_Detalle_producto_Detalle_producto_FK]
GO
ALTER TABLE [dbo].[Factura_Detalle_producto]  WITH CHECK ADD  CONSTRAINT [Factura_Detalle_producto_Factura_FK] FOREIGN KEY([Factura_Codigo_factura])
REFERENCES [dbo].[Factura] ([Codigo_factura])
GO
ALTER TABLE [dbo].[Factura_Detalle_producto] CHECK CONSTRAINT [Factura_Detalle_producto_Factura_FK]
GO
ALTER TABLE [dbo].[Historial_de_inventario]  WITH CHECK ADD  CONSTRAINT [Historial_de_inventario_Movimiento_de_inventario_FK] FOREIGN KEY([Movimiento_de_inventario_Codigo_movimiento_de_inventario])
REFERENCES [dbo].[Movimiento_de_inventario] ([Codigo_movimiento_de_inventario])
GO
ALTER TABLE [dbo].[Historial_de_inventario] CHECK CONSTRAINT [Historial_de_inventario_Movimiento_de_inventario_FK]
GO
ALTER TABLE [dbo].[Movimiento_de_inventario]  WITH CHECK ADD  CONSTRAINT [Movimiento_de_inventario_Empleado_FK] FOREIGN KEY([Empleado_DNI_empleado])
REFERENCES [dbo].[Empleado] ([DNI_empleado])
GO
ALTER TABLE [dbo].[Movimiento_de_inventario] CHECK CONSTRAINT [Movimiento_de_inventario_Empleado_FK]
GO
ALTER TABLE [dbo].[Orden_de_compra]  WITH CHECK ADD  CONSTRAINT [Orden_de_compra_Cliente_FK] FOREIGN KEY([Cliente_DNI_cliente])
REFERENCES [dbo].[Cliente] ([DNI_cliente])
GO
ALTER TABLE [dbo].[Orden_de_compra] CHECK CONSTRAINT [Orden_de_compra_Cliente_FK]
GO
ALTER TABLE [dbo].[Producto]  WITH CHECK ADD  CONSTRAINT [Producto_Categoria_producto_FK] FOREIGN KEY([Categoria_producto_Codigo_categoria_producto])
REFERENCES [dbo].[Categoria_producto] ([Codigo_categoria_producto])
GO
ALTER TABLE [dbo].[Producto] CHECK CONSTRAINT [Producto_Categoria_producto_FK]
GO
ALTER TABLE [dbo].[Producto_Ordendecompra]  WITH CHECK ADD  CONSTRAINT [Producto_Ordendecompra_Orden_de_compra_FK] FOREIGN KEY([Orden_de_compra_Codigo_orden_de_compra])
REFERENCES [dbo].[Orden_de_compra] ([Codigo_orden_de_compra])
GO
ALTER TABLE [dbo].[Producto_Ordendecompra] CHECK CONSTRAINT [Producto_Ordendecompra_Orden_de_compra_FK]
GO
ALTER TABLE [dbo].[Producto_Ordendecompra]  WITH CHECK ADD  CONSTRAINT [Producto_Ordendecompra_Producto_FK] FOREIGN KEY([Producto_Codigo_producto])
REFERENCES [dbo].[Producto] ([Codigo_producto])
GO
ALTER TABLE [dbo].[Producto_Ordendecompra] CHECK CONSTRAINT [Producto_Ordendecompra_Producto_FK]
GO
ALTER TABLE [dbo].[Producto_Proveedor]  WITH CHECK ADD  CONSTRAINT [Producto_Proveedor_Producto_FK] FOREIGN KEY([Producto_Codigo_producto])
REFERENCES [dbo].[Producto] ([Codigo_producto])
GO
ALTER TABLE [dbo].[Producto_Proveedor] CHECK CONSTRAINT [Producto_Proveedor_Producto_FK]
GO
ALTER TABLE [dbo].[Producto_Proveedor]  WITH CHECK ADD  CONSTRAINT [Producto_Proveedor_Proveedor_FK] FOREIGN KEY([Proveedor_Codigo_proveedor])
REFERENCES [dbo].[Proveedor] ([Codigo_proveedor])
GO
ALTER TABLE [dbo].[Producto_Proveedor] CHECK CONSTRAINT [Producto_Proveedor_Proveedor_FK]
GO
ALTER TABLE [dbo].[Supervisor]  WITH CHECK ADD  CONSTRAINT [Supervisor_Empleado_FK] FOREIGN KEY([DNI_empleado])
REFERENCES [dbo].[Empleado] ([DNI_empleado])
GO
ALTER TABLE [dbo].[Supervisor] CHECK CONSTRAINT [Supervisor_Empleado_FK]
GO
ALTER TABLE [dbo].[Tienda]  WITH CHECK ADD  CONSTRAINT [Tienda_Ciudad_FK] FOREIGN KEY([Ciudad_Codigo_ciudad])
REFERENCES [dbo].[Ciudad] ([Codigo_ciudad])
GO
ALTER TABLE [dbo].[Tienda] CHECK CONSTRAINT [Tienda_Ciudad_FK]
GO
ALTER TABLE [dbo].[Tienda]  WITH CHECK ADD  CONSTRAINT [Tienda_Empresa_FK] FOREIGN KEY([Empresa_Codigo_empresa])
REFERENCES [dbo].[Empresa] ([Codigo_empresa])
GO
ALTER TABLE [dbo].[Tienda] CHECK CONSTRAINT [Tienda_Empresa_FK]
GO
ALTER TABLE [dbo].[Tienda]  WITH CHECK ADD  CONSTRAINT [Tienda_Producto_FK] FOREIGN KEY([Producto_Codigo_producto])
REFERENCES [dbo].[Producto] ([Codigo_producto])
GO
ALTER TABLE [dbo].[Tienda] CHECK CONSTRAINT [Tienda_Producto_FK]
GO
ALTER TABLE [dbo].[Transaccion_de_pago]  WITH CHECK ADD  CONSTRAINT [Transaccion_de_pago_Metodo_de_pago_FK] FOREIGN KEY([Metodo_de_pago_Codigo_metodo_de_pago])
REFERENCES [dbo].[Metodo_de_pago] ([Codigo_metodo_de_pago])
GO
ALTER TABLE [dbo].[Transaccion_de_pago] CHECK CONSTRAINT [Transaccion_de_pago_Metodo_de_pago_FK]
GO
USE [master]
GO
ALTER DATABASE [DB_Sistema_Gestion_de_Inventario12] SET  READ_WRITE 
GO
