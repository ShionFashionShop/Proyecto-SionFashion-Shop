using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class sub_categoria
{
    [Key]
    public int id_sub_categoria { get; set; }

    [Required(ErrorMessage = "El nombre de la subcategoría es obligatorio.")]
    [StringLength(255, ErrorMessage = "El nombre de la subcategoría no puede exceder los 255 caracteres.")]
    public string nombre_sub_categoria { get; set; } = null!;

    [Required(ErrorMessage = "El ID de la categoría es obligatorio.")]
    public int id_categoria { get; set; }

    [ForeignKey("id_categoria")]
    [InverseProperty("sub_categoria")]
    public virtual categoria id_categoriaNavigation { get; set; } = null!;

    [InverseProperty("id_sub_categoriaNavigation")]
    public virtual ICollection<producto> productos { get; set; } = new List<producto>();
}
