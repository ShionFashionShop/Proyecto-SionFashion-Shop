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

    [StringLength(50)]
    public string metodo_pago { get; set; } = null!;

    public int? id_factura { get; set; }

    [ForeignKey("id_factura")]
    [InverseProperty("metodos_de_pagos")]
    public virtual factura? id_facturaNavigation { get; set; }
}
