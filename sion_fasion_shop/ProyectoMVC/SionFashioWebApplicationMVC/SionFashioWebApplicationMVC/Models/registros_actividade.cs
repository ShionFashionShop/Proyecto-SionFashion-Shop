using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class registros_actividade
{
    [Key]
    public int id_registro { get; set; }

    public int id_usuario { get; set; }

    [Required(ErrorMessage = "La actividad es obligatoria.")]
    [StringLength(500, ErrorMessage = "La actividad no puede exceder los 500 caracteres.")]
    public string actividad { get; set; } = null!;

    [Column(TypeName = "datetime")]
    [DataType(DataType.DateTime, ErrorMessage = "Formato de fecha inválido.")]
    public DateTime fecha_actividad { get; set; }

    [ForeignKey("id_usuario")]
    [InverseProperty("registros_actividades")]
    public virtual usuario id_usuarioNavigation { get; set; } = null!;
}
