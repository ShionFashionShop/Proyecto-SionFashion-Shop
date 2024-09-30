using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

[PrimaryKey("id_orden_compra", "id_producto")]
public partial class ordenes_producto
{
    [Key]
    public int id_orden_compra { get; set; }

    [Key]
    public int id_producto { get; set; }

    [Required(ErrorMessage = "La cantidad es obligatoria.")]
    [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser mayor que cero.")]
    public int cantidad { get; set; }

    [ForeignKey("id_orden_compra")]
    [InverseProperty("ordenes_productos")]
    public virtual ordenes_de_compra id_orden_compraNavigation { get; set; } = null!;

    [ForeignKey("id_producto")]
    [InverseProperty("ordenes_productos")]
    public virtual producto id_productoNavigation { get; set; } = null!;
}
