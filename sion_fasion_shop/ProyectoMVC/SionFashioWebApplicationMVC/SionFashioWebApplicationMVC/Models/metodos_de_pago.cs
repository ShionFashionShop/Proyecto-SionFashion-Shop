using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

[Table("metodos_de_pago")]
public partial class metodos_de_pago
{
    [Key]
    public int id_metodo_pago { get; set; }

    [Required(ErrorMessage = "El método de pago es obligatorio.")]
    [StringLength(50, ErrorMessage = "El método de pago no puede exceder los 50 caracteres.")]
    public string metodo_pago { get; set; } = null!;

    public int? id_factura { get; set; }

    [ForeignKey("id_factura")]
    [InverseProperty("metodos_de_pagos")]
    public virtual factura? id_facturaNavigation { get; set; }
}
