using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SionFashioWebApplicationMVC.Models;

[Table("alertas_stock")]
public partial class alertas_stock
{
    [Key]
    public int id_alerta { get; set; }

    public int id_producto { get; set; }

    public int nivel_minimo { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime fecha_alerta { get; set; }

    [ForeignKey("id_producto")]
    [InverseProperty("alertas_stocks")]
    public virtual producto id_productoNavigation { get; set; } = null!;
}
