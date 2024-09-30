using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class usuario
{
    [Key]
    public int id_usuario { get; set; }

    [Required(ErrorMessage = "El nombre de usuario es obligatorio.")]
    [StringLength(255, ErrorMessage = "El nombre de usuario no puede exceder los 255 caracteres.")]
    public string nombre_usuario { get; set; } = null!;

    [Required(ErrorMessage = "La clave de usuario es obligatoria.")]
    [StringLength(255, MinimumLength = 8, ErrorMessage = "La clave de usuario debe tener al menos 8 caracteres.")]
    public string clave_usuario { get; set; } = null!;

    [Required(ErrorMessage = "El ID de rol es obligatorio.")]
    public int id_rol { get; set; }

    [ForeignKey("id_rol")]
    [InverseProperty("usuarios")]
    public virtual role id_rolNavigation { get; set; } = null!;

    [InverseProperty("id_usuarioNavigation")]
    public virtual ICollection<registros_actividade> registros_actividades { get; set; } = new List<registros_actividade>();
}
