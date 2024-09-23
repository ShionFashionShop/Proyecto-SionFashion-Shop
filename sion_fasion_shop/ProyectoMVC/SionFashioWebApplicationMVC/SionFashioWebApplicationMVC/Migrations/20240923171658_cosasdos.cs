using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SionFashioWebApplicationMVC.Migrations
{
    /// <inheritdoc />
    public partial class cosasdos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "categorias",
                columns: table => new
                {
                    id_categoria = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_categoria = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__categori__CD54BC5A96EC1E1C", x => x.id_categoria);
                });

            migrationBuilder.CreateTable(
                name: "clientes",
                columns: table => new
                {
                    id_cliente = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_cliente = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    email_cliente = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    telefono_cliente = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    direccion_cliente = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__clientes__677F38F5A41537AF", x => x.id_cliente);
                });

            migrationBuilder.CreateTable(
                name: "empresas",
                columns: table => new
                {
                    id_empresa = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_empresa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    direccion_empresa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    telefono_empresa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    email_empresa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__empresas__4A0B7E2CBF58E78F", x => x.id_empresa);
                });

            migrationBuilder.CreateTable(
                name: "paises",
                columns: table => new
                {
                    id_pais = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_pais = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__paises__0941A3A73CFF96F9", x => x.id_pais);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id_rol = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_rol = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    descripcion_rol = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__roles__DC7B66356B9BBF18", x => x.id_rol);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "sub_categorias",
                columns: table => new
                {
                    id_sub_categoria = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_sub_categoria = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    id_categoria = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__sub_cate__3D86594DAD32418F", x => x.id_sub_categoria);
                    table.ForeignKey(
                        name: "FK__sub_categ__id_ca__0F624AF8",
                        column: x => x.id_categoria,
                        principalTable: "categorias",
                        principalColumn: "id_categoria");
                });

            migrationBuilder.CreateTable(
                name: "facturas",
                columns: table => new
                {
                    id_factura = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fecha_emision_factura = table.Column<DateTime>(type: "datetime", nullable: false),
                    sub_total_factura = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    impuesto_factura = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    total_factura = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    id_cliente = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__facturas__6C08ED53AD2D0B61", x => x.id_factura);
                    table.ForeignKey(
                        name: "FK__facturas__id_cli__534D60F1",
                        column: x => x.id_cliente,
                        principalTable: "clientes",
                        principalColumn: "id_cliente");
                });

            migrationBuilder.CreateTable(
                name: "departamentos",
                columns: table => new
                {
                    id_departamento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_departamento = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    id_pais = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__departam__64F37A166A6421AB", x => x.id_departamento);
                    table.ForeignKey(
                        name: "FK__departame__id_pa__398D8EEE",
                        column: x => x.id_pais,
                        principalTable: "paises",
                        principalColumn: "id_pais");
                });

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    id_usuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_usuario = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    clave_usuario = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    id_rol = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__usuarios__4E3E04AD9445F62E", x => x.id_usuario);
                    table.ForeignKey(
                        name: "FK__usuarios__id_rol__5FB337D6",
                        column: x => x.id_rol,
                        principalTable: "roles",
                        principalColumn: "id_rol");
                });

            migrationBuilder.CreateTable(
                name: "metodos_de_pago",
                columns: table => new
                {
                    id_metodo_pago = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    metodo_pago = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    id_factura = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__metodos___85BE0EBC43A100D9", x => x.id_metodo_pago);
                    table.ForeignKey(
                        name: "FK__metodos_d__id_fa__619B8048",
                        column: x => x.id_factura,
                        principalTable: "facturas",
                        principalColumn: "id_factura");
                });

            migrationBuilder.CreateTable(
                name: "ciudades",
                columns: table => new
                {
                    id_ciudad = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_ciudad = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    id_departamento = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ciudades__B7DC4CD57E899779", x => x.id_ciudad);
                    table.ForeignKey(
                        name: "FK__ciudades__id_dep__3C69FB99",
                        column: x => x.id_departamento,
                        principalTable: "departamentos",
                        principalColumn: "id_departamento");
                });

            migrationBuilder.CreateTable(
                name: "registros_actividades",
                columns: table => new
                {
                    id_registro = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_usuario = table.Column<int>(type: "int", nullable: false),
                    actividad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fecha_actividad = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__registro__AFB90F854AF83AE6", x => x.id_registro);
                    table.ForeignKey(
                        name: "FK_registros_actividades_usuarios_id_usuario",
                        column: x => x.id_usuario,
                        principalTable: "usuarios",
                        principalColumn: "id_usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "proveedores",
                columns: table => new
                {
                    id_proveedor = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_proveedor = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    contacto_proveedor = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    email_proveedor = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    id_ciudad = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__proveedo__9B1A7A4DC0FB78C7", x => x.id_proveedor);
                    table.ForeignKey(
                        name: "FK__proveedor__id_ci__46E78A0C",
                        column: x => x.id_ciudad,
                        principalTable: "ciudades",
                        principalColumn: "id_ciudad");
                });

            migrationBuilder.CreateTable(
                name: "tiendas",
                columns: table => new
                {
                    id_tienda = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_tienda = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    telefono_tienda = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ubicacion_tienda = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    id_ciudad = table.Column<int>(type: "int", nullable: false),
                    id_empresa = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tiendas__B672D3141F40D5C7", x => x.id_tienda);
                    table.ForeignKey(
                        name: "FK_tiendas_ciudades_id_ciudad",
                        column: x => x.id_ciudad,
                        principalTable: "ciudades",
                        principalColumn: "id_ciudad",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tiendas_empresas_id_empresa",
                        column: x => x.id_empresa,
                        principalTable: "empresas",
                        principalColumn: "id_empresa",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "empleados",
                columns: table => new
                {
                    id_empleado = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dni_empleado = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    nombres_empleado = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    apellidos_empleado = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    telefono_empleado = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    email_empleado = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    id_tienda = table.Column<int>(type: "int", nullable: true),
                    id_ciudad = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__empleado__88B513944BCC5AFB", x => x.id_empleado);
                    table.ForeignKey(
                        name: "FK__empleados__id_ci__4E88ABD4",
                        column: x => x.id_ciudad,
                        principalTable: "ciudades",
                        principalColumn: "id_ciudad");
                    table.ForeignKey(
                        name: "FK__empleados__id_ti__4D94879B",
                        column: x => x.id_tienda,
                        principalTable: "tiendas",
                        principalColumn: "id_tienda");
                });

            migrationBuilder.CreateTable(
                name: "productos",
                columns: table => new
                {
                    id_producto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_producto = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    descripcion_producto = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    precio_producto = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    unidad_medida = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: true),
                    peso_del_producto = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ubicacion_producto = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    id_sub_categoria = table.Column<int>(type: "int", nullable: false),
                    id_proveedor = table.Column<int>(type: "int", nullable: false),
                    id_tienda = table.Column<int>(type: "int", nullable: false),
                    id_factura = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__producto__FF341C0D3973994B", x => x.id_producto);
                    table.ForeignKey(
                        name: "FK__productos__id_fa__5DCAEF64",
                        column: x => x.id_factura,
                        principalTable: "facturas",
                        principalColumn: "id_factura");
                    table.ForeignKey(
                        name: "FK__productos__id_pr__5BE2A6F2",
                        column: x => x.id_proveedor,
                        principalTable: "proveedores",
                        principalColumn: "id_proveedor");
                    table.ForeignKey(
                        name: "FK_productos_sub_categorias_id_sub_categoria",
                        column: x => x.id_sub_categoria,
                        principalTable: "sub_categorias",
                        principalColumn: "id_sub_categoria",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_productos_tiendas_id_tienda",
                        column: x => x.id_tienda,
                        principalTable: "tiendas",
                        principalColumn: "id_tienda",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ordenes_de_compra",
                columns: table => new
                {
                    id_orden_compra = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_cliente = table.Column<int>(type: "int", nullable: false),
                    id_factura = table.Column<int>(type: "int", nullable: true),
                    id_empleado = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ordenes___71B729AF010BC7FC", x => x.id_orden_compra);
                    table.ForeignKey(
                        name: "FK__ordenes_d__id_cl__5629CD9C",
                        column: x => x.id_cliente,
                        principalTable: "clientes",
                        principalColumn: "id_cliente");
                    table.ForeignKey(
                        name: "FK__ordenes_d__id_em__5812160E",
                        column: x => x.id_empleado,
                        principalTable: "empleados",
                        principalColumn: "id_empleado");
                    table.ForeignKey(
                        name: "FK__ordenes_d__id_fa__571DF1D5",
                        column: x => x.id_factura,
                        principalTable: "facturas",
                        principalColumn: "id_factura");
                });

            migrationBuilder.CreateTable(
                name: "alertas_stock",
                columns: table => new
                {
                    id_alerta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_producto = table.Column<int>(type: "int", nullable: false),
                    nivel_minimo = table.Column<int>(type: "int", nullable: false),
                    fecha_alerta = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__alertas___1227953EE8C191DA", x => x.id_alerta);
                    table.ForeignKey(
                        name: "FK__alertas_s__id_pr__6EF57B66",
                        column: x => x.id_producto,
                        principalTable: "productos",
                        principalColumn: "id_producto");
                });

            migrationBuilder.CreateTable(
                name: "historial_inventario",
                columns: table => new
                {
                    id_historial_inventario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_producto = table.Column<int>(type: "int", nullable: false),
                    cantidad = table.Column<int>(type: "int", nullable: false),
                    tipo_cambio = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    fecha_cambio = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__historia__7B04571419F1DF4B", x => x.id_historial_inventario);
                    table.ForeignKey(
                        name: "FK__historial__id_pr__6C190EBB",
                        column: x => x.id_producto,
                        principalTable: "productos",
                        principalColumn: "id_producto");
                });

            migrationBuilder.CreateTable(
                name: "inventario",
                columns: table => new
                {
                    id_producto = table.Column<int>(type: "int", nullable: false),
                    stock_inicial = table.Column<int>(type: "int", nullable: false),
                    stock_actual = table.Column<int>(type: "int", nullable: false),
                    saldo = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__inventar__FF341C0DF584C001", x => x.id_producto);
                    table.ForeignKey(
                        name: "FK__inventari__id_pr__68487DD7",
                        column: x => x.id_producto,
                        principalTable: "productos",
                        principalColumn: "id_producto");
                });

            migrationBuilder.CreateTable(
                name: "ordenes_productos",
                columns: table => new
                {
                    id_orden_compra = table.Column<int>(type: "int", nullable: false),
                    id_producto = table.Column<int>(type: "int", nullable: false),
                    cantidad = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ordenes___BE44686FC1FB969A", x => new { x.id_orden_compra, x.id_producto });
                    table.ForeignKey(
                        name: "FK__ordenes_p__id_or__6477ECF3",
                        column: x => x.id_orden_compra,
                        principalTable: "ordenes_de_compra",
                        principalColumn: "id_orden_compra");
                    table.ForeignKey(
                        name: "FK__ordenes_p__id_pr__656C112C",
                        column: x => x.id_producto,
                        principalTable: "productos",
                        principalColumn: "id_producto");
                });

            migrationBuilder.CreateIndex(
                name: "IX_alertas_stock_id_producto",
                table: "alertas_stock",
                column: "id_producto");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ciudades_id_departamento",
                table: "ciudades",
                column: "id_departamento");

            migrationBuilder.CreateIndex(
                name: "IX_departamentos_id_pais",
                table: "departamentos",
                column: "id_pais");

            migrationBuilder.CreateIndex(
                name: "IX_empleados_id_ciudad",
                table: "empleados",
                column: "id_ciudad");

            migrationBuilder.CreateIndex(
                name: "IX_empleados_id_tienda",
                table: "empleados",
                column: "id_tienda");

            migrationBuilder.CreateIndex(
                name: "UQ__empleado__0FA5136F97BC99B9",
                table: "empleados",
                column: "dni_empleado",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_facturas_id_cliente",
                table: "facturas",
                column: "id_cliente");

            migrationBuilder.CreateIndex(
                name: "IX_historial_inventario_id_producto",
                table: "historial_inventario",
                column: "id_producto");

            migrationBuilder.CreateIndex(
                name: "IX_metodos_de_pago_id_factura",
                table: "metodos_de_pago",
                column: "id_factura");

            migrationBuilder.CreateIndex(
                name: "IX_ordenes_de_compra_id_cliente",
                table: "ordenes_de_compra",
                column: "id_cliente");

            migrationBuilder.CreateIndex(
                name: "IX_ordenes_de_compra_id_empleado",
                table: "ordenes_de_compra",
                column: "id_empleado");

            migrationBuilder.CreateIndex(
                name: "IX_ordenes_de_compra_id_factura",
                table: "ordenes_de_compra",
                column: "id_factura");

            migrationBuilder.CreateIndex(
                name: "IX_ordenes_productos_id_producto",
                table: "ordenes_productos",
                column: "id_producto");

            migrationBuilder.CreateIndex(
                name: "IX_productos_id_factura",
                table: "productos",
                column: "id_factura");

            migrationBuilder.CreateIndex(
                name: "IX_productos_id_proveedor",
                table: "productos",
                column: "id_proveedor");

            migrationBuilder.CreateIndex(
                name: "IX_productos_id_sub_categoria",
                table: "productos",
                column: "id_sub_categoria");

            migrationBuilder.CreateIndex(
                name: "IX_productos_id_tienda",
                table: "productos",
                column: "id_tienda");

            migrationBuilder.CreateIndex(
                name: "IX_proveedores_id_ciudad",
                table: "proveedores",
                column: "id_ciudad");

            migrationBuilder.CreateIndex(
                name: "IX_registros_actividades_id_usuario",
                table: "registros_actividades",
                column: "id_usuario");

            migrationBuilder.CreateIndex(
                name: "IX_sub_categorias_id_categoria",
                table: "sub_categorias",
                column: "id_categoria");

            migrationBuilder.CreateIndex(
                name: "IX_tiendas_id_ciudad",
                table: "tiendas",
                column: "id_ciudad");

            migrationBuilder.CreateIndex(
                name: "IX_tiendas_id_empresa",
                table: "tiendas",
                column: "id_empresa");

            migrationBuilder.CreateIndex(
                name: "IX_usuarios_id_rol",
                table: "usuarios",
                column: "id_rol");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "alertas_stock");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "historial_inventario");

            migrationBuilder.DropTable(
                name: "inventario");

            migrationBuilder.DropTable(
                name: "metodos_de_pago");

            migrationBuilder.DropTable(
                name: "ordenes_productos");

            migrationBuilder.DropTable(
                name: "registros_actividades");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "ordenes_de_compra");

            migrationBuilder.DropTable(
                name: "productos");

            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropTable(
                name: "empleados");

            migrationBuilder.DropTable(
                name: "facturas");

            migrationBuilder.DropTable(
                name: "proveedores");

            migrationBuilder.DropTable(
                name: "sub_categorias");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "tiendas");

            migrationBuilder.DropTable(
                name: "clientes");

            migrationBuilder.DropTable(
                name: "categorias");

            migrationBuilder.DropTable(
                name: "ciudades");

            migrationBuilder.DropTable(
                name: "empresas");

            migrationBuilder.DropTable(
                name: "departamentos");

            migrationBuilder.DropTable(
                name: "paises");
        }
    }
}
