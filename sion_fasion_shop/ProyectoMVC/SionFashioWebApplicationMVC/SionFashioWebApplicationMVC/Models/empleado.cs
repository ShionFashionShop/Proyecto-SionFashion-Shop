using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

[Index("dni_empleado", Name = "UQ__empleado__0FA5136F97BC99B9", IsUnique = true)]
public partial class empleado
{
    [Key]
    public int id_empleado { get; set; }

    [StringLength(255)]
    public string dni_empleado { get; set; } = null!;

    [StringLength(255)]
    public string nombres_empleado { get; set; } = null!;

    [StringLength(255)]
    public string apellidos_empleado { get; set; } = null!;

    [StringLength(255)]
    public string? telefono_empleado { get; set; }

    [StringLength(255)]
    public string? email_empleado { get; set; }

    public int? id_tienda { get; set; }

    public int? id_ciudad { get; set; }

    [ForeignKey("id_ciudad")]
    [InverseProperty("empleados")]
    public virtual ciudade id_ciudadNavigation { get; set; } = null!;

    [ForeignKey("id_tienda")]
    [InverseProperty("empleados")]
    public virtual tienda id_tiendaNavigation { get; set; } = null!;

    [InverseProperty("id_empleadoNavigation")]
    public virtual ICollection<ordenes_de_compra> ordenes_de_compras { get; set; } = new List<ordenes_de_compra>();
}
