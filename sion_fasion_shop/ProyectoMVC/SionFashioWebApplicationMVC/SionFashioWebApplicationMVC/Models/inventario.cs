using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

[Table("inventario")]
public partial class inventario
{
    [Key]
    public int id_producto { get; set; }


    [Required(ErrorMessage = "El stock inicial es obligatorio.")]
    [Range(0, int.MaxValue, ErrorMessage = "El stock inicial debe ser un número positivo.")]
    public int stock_inicial { get; set; }

    [Required(ErrorMessage = "El stock actual es obligatorio.")]
    [Range(0, int.MaxValue, ErrorMessage = "El stock actual debe ser un número positivo.")]
    public int stock_actual { get; set; }

    [Required(ErrorMessage = "El saldo es obligatorio.")]
    [Range(0, int.MaxValue, ErrorMessage = "El saldo debe ser un número positivo.")]
    public int saldo { get; set; }
    [ForeignKey("id_producto")]
    [InverseProperty("inventario")]
    public virtual producto id_productoNavigation { get; set; } = null!;
}
