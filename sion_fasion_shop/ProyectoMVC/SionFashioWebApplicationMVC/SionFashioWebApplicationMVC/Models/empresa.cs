using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class empresa
{
    [Key]
    public int id_empresa { get; set; }

    [Required(ErrorMessage = "El nombre de la empresa es obligatorio.")]
    [StringLength(255, ErrorMessage = "El nombre de la empresa no puede exceder los 255 caracteres.")]
    public string nombre_empresa { get; set; } = null!;

    [StringLength(255, ErrorMessage = "La dirección no puede exceder los 255 caracteres.")]
    public string? direccion_empresa { get; set; }

    [StringLength(255, ErrorMessage = "El teléfono no puede exceder los 255 caracteres.")]
    [Phone(ErrorMessage = "El número de teléfono no tiene un formato válido.")]
    public string? telefono_empresa { get; set; }

    [StringLength(255, ErrorMessage = "El correo electrónico no puede exceder los 255 caracteres.")]
    [EmailAddress(ErrorMessage = "El correo electrónico no tiene un formato válido.")]
    public string? email_empresa { get; set; }

    [InverseProperty("id_empresaNavigation")]
    public virtual ICollection<tienda> tienda { get; set; } = new List<tienda>();
}
