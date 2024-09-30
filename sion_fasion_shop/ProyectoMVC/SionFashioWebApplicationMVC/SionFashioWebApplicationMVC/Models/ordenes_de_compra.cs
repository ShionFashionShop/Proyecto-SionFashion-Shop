using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

[Table("ordenes_de_compra")]
public partial class ordenes_de_compra
{
    [Key]
    public int id_orden_compra { get; set; }

    [Required(ErrorMessage = "El ID del cliente es obligatorio.")]
    public int id_cliente { get; set; }

    public int? id_factura { get; set; }

    public int? id_empleado { get; set; }

    [ForeignKey("id_cliente")]
    [InverseProperty("ordenes_de_compras")]
    public virtual cliente id_clienteNavigation { get; set; } = null!;

    [ForeignKey("id_empleado")]
    [InverseProperty("ordenes_de_compras")]
    public virtual empleado? id_empleadoNavigation { get; set; }

    [ForeignKey("id_factura")]
    [InverseProperty("ordenes_de_compras")]
    public virtual factura? id_facturaNavigation { get; set; }

    [InverseProperty("id_orden_compraNavigation")]
    public virtual ICollection<ordenes_producto> ordenes_productos { get; set; } = new List<ordenes_producto>();
}
