using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class departamento
{
    [Key]
    public int id_departamento { get; set; }

    [StringLength(255)]
    public string nombre_departamento { get; set; } = null!;

    public int id_pais { get; set; }

    [InverseProperty("id_departamentoNavigation")]
    public virtual ICollection<ciudade> ciudades { get; set; } = new List<ciudade>();

    [ForeignKey("id_pais")]
    [InverseProperty("departamentos")]
    public virtual paise id_paisNavigation { get; set; } = null!;
}
