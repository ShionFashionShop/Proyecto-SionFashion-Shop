using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class ciudade
{
    [Key]
    public int id_ciudad { get; set; }

    [StringLength(255)]
    public string nombre_ciudad { get; set; } = null!;

    public int id_departamento { get; set; }

    [InverseProperty("id_ciudadNavigation")]
    public virtual ICollection<empleado> empleados { get; set; } = new List<empleado>();

    [ForeignKey("id_departamento")]
    [InverseProperty("ciudades")]
    public virtual departamento id_departamentoNavigation { get; set; } = null!;

    [InverseProperty("id_ciudadNavigation")]
    public virtual ICollection<proveedore> proveedores { get; set; } = new List<proveedore>();

    [InverseProperty("id_ciudadNavigation")]
    public virtual ICollection<tienda> tienda { get; set; } = new List<tienda>();
}
