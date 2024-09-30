using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class tienda
{
    [Key]
    public int id_tienda { get; set; }

    [Required(ErrorMessage = "El nombre de la tienda es obligatorio.")]
    [StringLength(255, ErrorMessage = "El nombre de la tienda no puede exceder los 255 caracteres.")]
    public string nombre_tienda { get; set; } = null!;

    [StringLength(255, ErrorMessage = "El teléfono de la tienda no puede exceder los 255 caracteres.")]
    [RegularExpression(@"^\+?\d+$", ErrorMessage = "El teléfono de la tienda solo puede contener números positivos y el símbolo '+'.")]
    public string? telefono_tienda { get; set; }

    [StringLength(255, ErrorMessage = "La ubicación de la tienda no puede exceder los 255 caracteres.")]
    public string? ubicacion_tienda { get; set; }

    [Required(ErrorMessage = "El ID de la ciudad es obligatorio.")]
    public int id_ciudad { get; set; }

    [Required(ErrorMessage = "El ID de la empresa es obligatorio.")]
    public int id_empresa { get; set; }


    [InverseProperty("id_tiendaNavigation")]
    public virtual ICollection<empleado> empleados { get; set; } = new List<empleado>();

    [ForeignKey("id_ciudad")]
    [InverseProperty("tienda")]
    public virtual ciudade id_ciudadNavigation { get; set; } = null!;

    [ForeignKey("id_empresa")]
    [InverseProperty("tienda")]
    public virtual empresa id_empresaNavigation { get; set; } = null!;

    [InverseProperty("id_tiendaNavigation")]
    public virtual ICollection<producto> productos { get; set; } = new List<producto>();
}
