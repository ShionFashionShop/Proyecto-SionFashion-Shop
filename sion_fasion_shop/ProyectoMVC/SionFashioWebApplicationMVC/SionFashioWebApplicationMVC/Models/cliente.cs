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

    [StringLength(255)]
    public string? nombre_cliente { get; set; }

    [StringLength(255)]
    public string? email_cliente { get; set; }

    [StringLength(255)]
    public string? telefono_cliente { get; set; }

    [StringLength(255)]
    public string? direccion_cliente { get; set; }

    [InverseProperty("id_clienteNavigation")]
    public virtual ICollection<factura> facturas { get; set; } = new List<factura>();

    [InverseProperty("id_clienteNavigation")]
    public virtual ICollection<ordenes_de_compra> ordenes_de_compras { get; set; } = new List<ordenes_de_compra>();
}
