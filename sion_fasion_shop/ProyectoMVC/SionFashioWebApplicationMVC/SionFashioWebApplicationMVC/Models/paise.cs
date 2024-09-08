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

    [StringLength(255)]
    public string nombre_pais { get; set; } = null!;

    [InverseProperty("id_paisNavigation")]
    public virtual ICollection<departamento> departamentos { get; set; } = new List<departamento>();
}
