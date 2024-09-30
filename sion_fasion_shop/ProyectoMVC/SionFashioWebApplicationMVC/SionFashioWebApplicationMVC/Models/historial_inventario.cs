using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

[Table("historial_inventario")]
public partial class historial_inventario
{
    [Key]
    public int id_historial_inventario { get; set; }

    [Required(ErrorMessage = "El ID del producto es obligatorio.")]
    public int id_producto { get; set; }

    [Required(ErrorMessage = "La cantidad es obligatoria.")]
    [Range(0, int.MaxValue, ErrorMessage = "La cantidad debe ser un número positivo.")]
    public int cantidad { get; set; }

    [Required(ErrorMessage = "El tipo de cambio es obligatorio.")]
    [StringLength(10, ErrorMessage = "El tipo de cambio no puede exceder los 10 caracteres.")]
    public string tipo_cambio { get; set; } = null!;

    [Required(ErrorMessage = "La fecha de cambio es obligatoria.")]
    [Column(TypeName = "datetime")]
    public DateTime fecha_cambio { get; set; }

    [ForeignKey("id_producto")]
    [InverseProperty("historial_inventarios")]
    public virtual producto id_productoNavigation { get; set; } = null!;
}
