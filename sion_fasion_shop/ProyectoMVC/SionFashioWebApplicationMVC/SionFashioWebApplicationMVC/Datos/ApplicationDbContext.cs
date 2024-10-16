﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SionFashioWebApplicationMVC.Models;

namespace SionFashioWebApplicationMVC.Datos
{
    public partial class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Definición de DbSet para cada entidad
        public virtual DbSet<alertas_stock> alertas_stocks { get; set; }
        public virtual DbSet<categoria> categorias { get; set; }
        public virtual DbSet<ciudade> ciudades { get; set; }
        public virtual DbSet<cliente> clientes { get; set; }
        public virtual DbSet<departamento> departamentos { get; set; }
        public virtual DbSet<empleado> empleados { get; set; }
        public virtual DbSet<empresa> empresas { get; set; }
        public virtual DbSet<factura> facturas { get; set; }
        public virtual DbSet<historial_inventario> historial_inventarios { get; set; }
        public virtual DbSet<inventario> inventarios { get; set; }
        public virtual DbSet<metodos_de_pago> metodos_de_pagos { get; set; }
        public virtual DbSet<ordenes_de_compra> ordenes_de_compras { get; set; }
        public virtual DbSet<ordenes_producto> ordenes_productos { get; set; }
        public virtual DbSet<paise> paises { get; set; }
        public virtual DbSet<producto> productos { get; set; }
        public virtual DbSet<proveedore> proveedores { get; set; }
        public virtual DbSet<registros_actividade> registros_actividades { get; set; }
        public virtual DbSet<role> roles { get; set; }
        public virtual DbSet<sub_categoria> sub_categorias { get; set; }
        public virtual DbSet<tienda> tiendas { get; set; }
        public virtual DbSet<usuario> usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<alertas_stock>(entity =>
            {
                entity.HasKey(e => e.id_alerta).HasName("PK__alertas___1227953EE8C191DA");

                entity.HasOne(d => d.id_productoNavigation).WithMany(p => p.alertas_stocks)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__alertas_s__id_pr__6EF57B66");
            });

            modelBuilder.Entity<categoria>(entity =>
            {
                entity.HasKey(e => e.id_categoria).HasName("PK__categori__CD54BC5A96EC1E1C");
            });

            modelBuilder.Entity<ciudade>(entity =>
            {
                entity.HasKey(e => e.id_ciudad).HasName("PK__ciudades__B7DC4CD57E899779");

                entity.HasOne(d => d.id_departamentoNavigation).WithMany(p => p.ciudades)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ciudades__id_dep__3C69FB99");
            });

            modelBuilder.Entity<cliente>(entity =>
            {
                entity.HasKey(e => e.id_cliente).HasName("PK__clientes__677F38F5A41537AF");
            });

            modelBuilder.Entity<departamento>(entity =>
            {
                entity.HasKey(e => e.id_departamento).HasName("PK__departam__64F37A166A6421AB");

                entity.HasOne(d => d.id_paisNavigation).WithMany(p => p.departamentos)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__departame__id_pa__398D8EEE");
            });

            modelBuilder.Entity<empleado>(entity =>
            {
                entity.HasKey(e => e.id_empleado).HasName("PK__empleado__88B513944BCC5AFB");

                entity.HasOne(d => d.id_ciudadNavigation).WithMany(p => p.empleados)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__empleados__id_ci__4E88ABD4");

                entity.HasOne(d => d.id_tiendaNavigation).WithMany(p => p.empleados)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__empleados__id_ti__4D94879B");
            });

            modelBuilder.Entity<empresa>(entity =>
            {
                entity.HasKey(e => e.id_empresa).HasName("PK__empresas__4A0B7E2CBF58E78F");
            });

            modelBuilder.Entity<factura>(entity =>
            {
                entity.HasKey(e => e.id_factura).HasName("PK__facturas__6C08ED53AD2D0B61");

                entity.HasOne(d => d.id_clienteNavigation).WithMany(p => p.facturas)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__facturas__id_cli__534D60F1");
            });

            modelBuilder.Entity<historial_inventario>(entity =>
            {
                entity.HasKey(e => e.id_historial_inventario).HasName("PK__historia__7B04571419F1DF4B");

                entity.HasOne(d => d.id_productoNavigation).WithMany(p => p.historial_inventarios)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__historial__id_pr__6C190EBB");
            });

            modelBuilder.Entity<inventario>(entity =>
            {
                entity.HasKey(e => e.id_producto).HasName("PK__inventar__FF341C0DF584C001");

                entity.Property(e => e.id_producto).ValueGeneratedNever();

                entity.HasOne(d => d.id_productoNavigation).WithOne(p => p.inventario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__inventari__id_pr__68487DD7");
            });

            modelBuilder.Entity<metodos_de_pago>(entity =>
            {
                entity.HasKey(e => e.id_metodo_pago).HasName("PK__metodos___85BE0EBC43A100D9");

                entity.HasOne(d => d.id_facturaNavigation).WithMany(p => p.metodos_de_pagos).HasConstraintName("FK__metodos_d__id_fa__619B8048");
            });

            modelBuilder.Entity<ordenes_de_compra>(entity =>
            {
                entity.HasKey(e => e.id_orden_compra).HasName("PK__ordenes___71B729AF010BC7FC");

                entity.HasOne(d => d.id_clienteNavigation).WithMany(p => p.ordenes_de_compras)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ordenes_d__id_cl__5629CD9C");

                entity.HasOne(d => d.id_empleadoNavigation).WithMany(p => p.ordenes_de_compras).HasConstraintName("FK__ordenes_d__id_em__5812160E");

                entity.HasOne(d => d.id_facturaNavigation).WithMany(p => p.ordenes_de_compras).HasConstraintName("FK__ordenes_d__id_fa__571DF1D5");
            });

            modelBuilder.Entity<ordenes_producto>(entity =>
            {
                entity.HasKey(e => new { e.id_orden_compra, e.id_producto }).HasName("PK__ordenes___BE44686FC1FB969A");

                entity.HasOne(d => d.id_orden_compraNavigation).WithMany(p => p.ordenes_productos)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ordenes_p__id_or__6477ECF3");

                entity.HasOne(d => d.id_productoNavigation).WithMany(p => p.ordenes_productos)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ordenes_p__id_pr__656C112C");
            });

            modelBuilder.Entity<paise>(entity =>
            {
                entity.HasKey(e => e.id_pais).HasName("PK__paises__0941A3A73CFF96F9");
            });

            modelBuilder.Entity<producto>(entity =>
            {
                entity.HasKey(e => e.id_producto).HasName("PK__producto__FF341C0D3973994B");

                entity.HasOne(d => d.id_facturaNavigation).WithMany(p => p.productos).HasConstraintName("FK__productos__id_fa__5DCAEF64");

                entity.HasOne(d => d.id_proveedorNavigation).WithMany(p => p.productos)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__productos__id_pr__5BE2A6F2");
            });

            modelBuilder.Entity<proveedore>(entity =>
            {
                entity.HasKey(e => e.id_proveedor).HasName("PK__proveedo__9B1A7A4DC0FB78C7");

                entity.HasOne(d => d.id_ciudadNavigation).WithMany(p => p.proveedores)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__proveedor__id_ci__46E78A0C");
            });

            modelBuilder.Entity<registros_actividade>(entity =>
            {
                entity.HasKey(e => e.id_registro).HasName("PK__registro__AFB90F854AF83AE6");
            });

            modelBuilder.Entity<role>(entity =>
            {
                entity.HasKey(e => e.id_rol).HasName("PK__roles__DC7B66356B9BBF18");
            });

            modelBuilder.Entity<sub_categoria>(entity =>
            {
                entity.HasKey(e => e.id_sub_categoria).HasName("PK__sub_cate__3D86594DAD32418F");

                entity.HasOne(d => d.id_categoriaNavigation).WithMany(p => p.sub_categoria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__sub_categ__id_ca__0F624AF8");
            });

            modelBuilder.Entity<tienda>(entity =>
            {
                entity.HasKey(e => e.id_tienda).HasName("PK__tiendas__B672D3141F40D5C7");
            });

            modelBuilder.Entity<usuario>(entity =>
            {
                entity.HasKey(e => e.id_usuario).HasName("PK__usuarios__4E3E04AD9445F62E");

                entity.HasOne(d => d.id_rolNavigation).WithMany(p => p.usuarios)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__usuarios__id_rol__5FB337D6");
            });
        }
    }
}
