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

    public int stock_inicial { get; set; }

    public int stock_actual { get; set; }

    public int saldo { get; set; }

    [ForeignKey("id_producto")]
    [InverseProperty("inventario")]
    public virtual producto id_productoNavigation { get; set; } = null!;
}
