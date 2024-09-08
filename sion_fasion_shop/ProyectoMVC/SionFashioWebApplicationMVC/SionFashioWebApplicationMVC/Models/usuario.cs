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

    [StringLength(255)]
    public string nombre_usuario { get; set; } = null!;

    [StringLength(255)]
    public string clave_usuario { get; set; } = null!;

    public int id_rol { get; set; }

    [ForeignKey("id_rol")]
    [InverseProperty("usuarios")]
    public virtual role id_rolNavigation { get; set; } = null!;

    [InverseProperty("id_usuarioNavigation")]
    public virtual ICollection<registros_actividade> registros_actividades { get; set; } = new List<registros_actividade>();
}
