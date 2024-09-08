using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

public partial class factura
{
    [Key]
    public int id_factura { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime fecha_emision_factura { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal sub_total_factura { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal impuesto_factura { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal total_factura { get; set; }

    public int id_cliente { get; set; }

    [ForeignKey("id_cliente")]
    [InverseProperty("facturas")]
    public virtual cliente id_clienteNavigation { get; set; } = null!;

    [InverseProperty("id_facturaNavigation")]
    public virtual ICollection<metodos_de_pago> metodos_de_pagos { get; set; } = new List<metodos_de_pago>();

    [InverseProperty("id_facturaNavigation")]
    public virtual ICollection<ordenes_de_compra> ordenes_de_compras { get; set; } = new List<ordenes_de_compra>();

    [InverseProperty("id_facturaNavigation")]
    public virtual ICollection<producto> productos { get; set; } = new List<producto>();
}
