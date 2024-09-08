using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class tienda
{
    [Key]
    public int id_tienda { get; set; }

    [StringLength(255)]
    public string nombre_tienda { get; set; } = null!;

    [StringLength(255)]
    public string? telefono_tienda { get; set; }

    [StringLength(255)]
    public string? ubicacion_tienda { get; set; }

    public int id_ciudad { get; set; }

    public int id_empresa { get; set; }

    [InverseProperty("id_tiendaNavigation")]
    public virtual ICollection<empleado> empleados { get; set; } = new List<empleado>();

    [ForeignKey("id_ciudad")]
    [InverseProperty("tienda")]
    public virtual ciudade id_ciudadNavigation { get; set; } = null!;

    [ForeignKey("id_empresa")]
    [InverseProperty("tienda")]
    public virtual empresa id_empresaNavigation { get; set; } = null!;

    [InverseProperty("id_tiendaNavigation")]
    public virtual ICollection<producto> productos { get; set; } = new List<producto>();
}
