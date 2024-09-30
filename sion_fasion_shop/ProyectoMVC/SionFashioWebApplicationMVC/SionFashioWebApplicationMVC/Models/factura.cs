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

    [Required(ErrorMessage = "La fecha de emisión es obligatoria.")]
    [Column(TypeName = "datetime")]
    public DateTime fecha_emision_factura { get; set; }

    [Required(ErrorMessage = "El subtotal es obligatorio.")]
    [Range(0, 9999999999.99, ErrorMessage = "El subtotal debe estar entre 0 y 9999999999.99.")]
    [Column(TypeName = "decimal(10, 2)")]
    public decimal sub_total_factura { get; set; }

    [Required(ErrorMessage = "El impuesto es obligatorio.")]
    [Range(0, 9999999999.99, ErrorMessage = "El impuesto debe estar entre 0 y 9999999999.99.")]
    [Column(TypeName = "decimal(10, 2)")]
    public decimal impuesto_factura { get; set; }

    [Required(ErrorMessage = "El total es obligatorio.")]
    [Range(0, 9999999999.99, ErrorMessage = "El total debe estar entre 0 y 9999999999.99.")]
    [Column(TypeName = "decimal(10, 2)")]
    public decimal total_factura { get; set; }

    [Required(ErrorMessage = "El cliente es obligatorio.")]
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
