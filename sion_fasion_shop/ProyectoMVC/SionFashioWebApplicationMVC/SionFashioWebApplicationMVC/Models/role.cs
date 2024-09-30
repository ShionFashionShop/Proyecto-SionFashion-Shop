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

    [Required(ErrorMessage = "El nombre del rol es obligatorio.")]
    [StringLength(255, ErrorMessage = "El nombre del rol no puede exceder los 255 caracteres.")]
    public string nombre_rol { get; set; } = null!;

    [StringLength(500, ErrorMessage = "La descripción del rol no puede exceder los 500 caracteres.")]
    public string? descripcion_rol { get; set; }

    [InverseProperty("id_rolNavigation")]
    public virtual ICollection<usuario> usuarios { get; set; } = new List<usuario>();
}
