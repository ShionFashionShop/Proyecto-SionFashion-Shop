using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class categoria
{
    [Key]
    public int id_categoria { get; set; }

    [StringLength(255)]
    public string nombre_categoria { get; set; } = null!;

    [InverseProperty("id_categoriaNavigation")]
    public virtual ICollection<sub_categoria> sub_categoria { get; set; } = new List<sub_categoria>();
}
