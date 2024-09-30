using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class paise
{
    [Key]
    public int id_pais { get; set; }

    [Required(ErrorMessage = "El nombre del país es obligatorio.")]
    [StringLength(255, ErrorMessage = "El nombre del país no puede exceder los 255 caracteres.")]
    public string nombre_pais { get; set; } = null!;

    [InverseProperty("id_paisNavigation")]
    public virtual ICollection<departamento> departamentos { get; set; } = new List<departamento>();
}
