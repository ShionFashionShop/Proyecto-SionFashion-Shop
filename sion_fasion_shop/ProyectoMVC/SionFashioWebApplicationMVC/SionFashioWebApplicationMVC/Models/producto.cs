using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class producto
{
    [Key]
    public int id_producto { get; set; }

    [Required(ErrorMessage = "El nombre del producto es obligatorio.")]
    [StringLength(255, ErrorMessage = "El nombre del producto no puede exceder los 255 caracteres.")]
    public string nombre_producto { get; set; } = null!;

    [StringLength(255, ErrorMessage = "La descripción del producto no puede exceder los 255 caracteres.")]
    public string? descripcion_producto { get; set; }

    [Required(ErrorMessage = "El precio del producto es obligatorio.")]
    [Column(TypeName = "decimal(10, 2)")]
    [Range(0.01, 9999999999.99, ErrorMessage = "El precio del producto debe ser mayor que cero.")]
    public decimal precio_producto { get; set; }

    [StringLength(4, ErrorMessage = "La unidad de medida no puede exceder los 4 caracteres.")]
    public string? unidad_medida { get; set; }

    [StringLength(255, ErrorMessage = "El peso del producto no puede exceder los 255 caracteres.")]
    public string? peso_del_producto { get; set; }

    [StringLength(255, ErrorMessage = "La ubicación del producto no puede exceder los 255 caracteres.")]
    public string? ubicacion_producto { get; set; }

    [Required(ErrorMessage = "La subcategoría es obligatoria.")]
    public int id_sub_categoria { get; set; }

    [Required(ErrorMessage = "El proveedor es obligatorio.")]
    public int id_proveedor { get; set; }

    [Required(ErrorMessage = "La tienda es obligatoria.")]
    public int id_tienda { get; set; }

    public int? id_factura { get; set; }

    [InverseProperty("id_productoNavigation")]
    public virtual ICollection<alertas_stock> alertas_stocks { get; set; } = new List<alertas_stock>();

    [InverseProperty("id_productoNavigation")]
    public virtual ICollection<historial_inventario> historial_inventarios { get; set; } = new List<historial_inventario>();

    [ForeignKey("id_factura")]
    [InverseProperty("productos")]
    public virtual factura? id_facturaNavigation { get; set; }

    [ForeignKey("id_proveedor")]
    [InverseProperty("productos")]
    public virtual proveedore id_proveedorNavigation { get; set; } = null!;

    [ForeignKey("id_sub_categoria")]
    [InverseProperty("productos")]
    public virtual sub_categoria id_sub_categoriaNavigation { get; set; } = null!;

    [ForeignKey("id_tienda")]
    [InverseProperty("productos")]
    public virtual tienda id_tiendaNavigation { get; set; } = null!;

    [InverseProperty("id_productoNavigation")]
    public virtual inventario? inventario { get; set; }

    [InverseProperty("id_productoNavigation")]
    public virtual ICollection<ordenes_producto> ordenes_productos { get; set; } = new List<ordenes_producto>();
}
