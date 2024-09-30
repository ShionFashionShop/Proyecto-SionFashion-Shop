using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class cliente
{
    [Key]
    public int id_cliente { get; set; }

    [StringLength(255, ErrorMessage = "El nombre del cliente no puede exceder los 255 caracteres.")]
    public string? nombre_cliente { get; set; }

    [EmailAddress(ErrorMessage = "El correo electrónico no es válido.")]
    [StringLength(255, ErrorMessage = "El correo electrónico no puede exceder los 255 caracteres.")]
    public string? email_cliente { get; set; }

    [Phone(ErrorMessage = "El número de teléfono no es válido.")]
    [StringLength(255, ErrorMessage = "El número de teléfono no puede exceder los 255 caracteres.")]
    public string? telefono_cliente { get; set; }

    [StringLength(255, ErrorMessage = "La dirección no puede exceder los 255 caracteres.")]
    public string? direccion_cliente { get; set; }

    [InverseProperty("id_clienteNavigation")]
    public virtual ICollection<factura> facturas { get; set; } = new List<factura>();

    [InverseProperty("id_clienteNavigation")]
    public virtual ICollection<ordenes_de_compra> ordenes_de_compras { get; set; } = new List<ordenes_de_compra>();
}
