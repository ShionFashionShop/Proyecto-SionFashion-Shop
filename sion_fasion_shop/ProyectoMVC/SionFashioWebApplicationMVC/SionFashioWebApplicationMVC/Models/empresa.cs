using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class empresa
{
    [Key]
    public int id_empresa { get; set; }

    [StringLength(255)]
    public string nombre_empresa { get; set; } = null!;

    [StringLength(255)]
    public string? direccion_empresa { get; set; }

    [StringLength(255)]
    public string? telefono_empresa { get; set; }

    [StringLength(255)]
    public string? email_empresa { get; set; }

    [InverseProperty("id_empresaNavigation")]
    public virtual ICollection<tienda> tienda { get; set; } = new List<tienda>();
}
