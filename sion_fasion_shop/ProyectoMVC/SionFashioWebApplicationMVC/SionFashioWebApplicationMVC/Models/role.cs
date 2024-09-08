using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class role
{
    [Key]
    public int id_rol { get; set; }

    [StringLength(255)]
    public string nombre_rol { get; set; } = null!;

    public string? descripcion_rol { get; set; }

    [InverseProperty("id_rolNavigation")]
    public virtual ICollection<usuario> usuarios { get; set; } = new List<usuario>();
}
