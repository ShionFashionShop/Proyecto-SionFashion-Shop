using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class proveedore
{
    [Key]
    public int id_proveedor { get; set; }

    [Required(ErrorMessage = "El nombre del proveedor es obligatorio.")]
    [StringLength(255, ErrorMessage = "El nombre del proveedor no puede exceder los 255 caracteres.")]
    public string nombre_proveedor { get; set; } = null!;

    [StringLength(255, ErrorMessage = "El contacto del proveedor no puede exceder los 255 caracteres.")]
    public string? contacto_proveedor { get; set; }

    [StringLength(255, ErrorMessage = "El email del proveedor no puede exceder los 255 caracteres.")]
    [EmailAddress(ErrorMessage = "El formato del email no es válido.")]
    public string? email_proveedor { get; set; }

    public int? id_ciudad { get; set; }

    [ForeignKey("id_ciudad")]
    [InverseProperty("proveedores")]
    public virtual ciudade? id_ciudadNavigation { get; set; }

    [InverseProperty("id_proveedorNavigation")]
    public virtual ICollection<producto> productos { get; set; } = new List<producto>();
}
