using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

[Index("dni_empleado", Name = "UQ__empleado__0FA5136F97BC99B9", IsUnique = true)]
public partial class empleado
{
    [Key]
    public int id_empleado { get; set; }

    [Required(ErrorMessage = "El DNI del empleado es obligatorio.")]
    [StringLength(255, ErrorMessage = "El DNI no puede exceder los 255 caracteres.")]
    public string dni_empleado { get; set; } = null!;

    [Required(ErrorMessage = "El nombre del empleado es obligatorio.")]
    [StringLength(255, ErrorMessage = "El nombre no puede exceder los 255 caracteres.")]
    public string nombres_empleado { get; set; } = null!;

    [Required(ErrorMessage = "El apellido del empleado es obligatorio.")]
    [StringLength(255, ErrorMessage = "El apellido no puede exceder los 255 caracteres.")]
    public string apellidos_empleado { get; set; } = null!;

    [StringLength(255, ErrorMessage = "El teléfono no puede exceder los 255 caracteres.")]
    [Phone(ErrorMessage = "El número de teléfono no tiene un formato válido.")]
    public string? telefono_empleado { get; set; }

    [StringLength(255, ErrorMessage = "El correo electrónico no puede exceder los 255 caracteres.")]
    [EmailAddress(ErrorMessage = "El correo electrónico no tiene un formato válido.")]
    public string? email_empleado { get; set; }

    public int? id_tienda { get; set; }

    public int? id_ciudad { get; set; }

    [ForeignKey("id_ciudad")]
    [InverseProperty("empleados")]
    public virtual ciudade id_ciudadNavigation { get; set; } = null!;

    [ForeignKey("id_tienda")]
    [InverseProperty("empleados")]
    public virtual tienda id_tiendaNavigation { get; set; } = null!;

    [InverseProperty("id_empleadoNavigation")]
    public virtual ICollection<ordenes_de_compra> ordenes_de_compras { get; set; } = new List<ordenes_de_compra>();
}
