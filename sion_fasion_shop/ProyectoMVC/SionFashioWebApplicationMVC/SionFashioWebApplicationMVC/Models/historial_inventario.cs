using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

[Table("historial_inventario")]
public partial class historial_inventario
{
    [Key]
    public int id_historial_inventario { get; set; }

    public int id_producto { get; set; }

    public int cantidad { get; set; }

    [StringLength(10)]
    public string tipo_cambio { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime fecha_cambio { get; set; }

    [ForeignKey("id_producto")]
    [InverseProperty("historial_inventarios")]
    public virtual producto id_productoNavigation { get; set; } = null!;
}
