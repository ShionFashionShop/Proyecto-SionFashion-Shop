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

    [Required(ErrorMessage = "El nombre de la categoría es obligatorio.")]
    [StringLength(100, ErrorMessage = "El nombre de la categoría no puede exceder los 100 caracteres.")]
    public string nombre_categoria { get; set; } = null!;

    [InverseProperty("id_categoriaNavigation")]
    public virtual ICollection<sub_categoria> sub_categoria { get; set; } = new List<sub_categoria>();
}
