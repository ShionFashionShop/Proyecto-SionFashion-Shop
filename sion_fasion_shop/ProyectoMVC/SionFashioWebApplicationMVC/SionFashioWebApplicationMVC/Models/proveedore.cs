using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class proveedore
{
    [Key]
    public int id_proveedor { get; set; }

    [StringLength(255)]
    public string nombre_proveedor { get; set; } = null!;

    [StringLength(255)]
    public string? contacto_proveedor { get; set; }

    [StringLength(255)]
    public string? email_proveedor { get; set; }

    public int? id_ciudad { get; set; }

    [ForeignKey("id_ciudad")]
    [InverseProperty("proveedores")]
    public virtual ciudade? id_ciudadNavigation { get; set; }

    [InverseProperty("id_proveedorNavigation")]
    public virtual ICollection<producto> productos { get; set; } = new List<producto>();
}
