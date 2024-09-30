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

    [Required(ErrorMessage = "El id del producto es obligatorio.")]
    public int id_producto { get; set; }

    [Required(ErrorMessage = "El nivel mínimo es obligatorio.")]
    [Range(0, int.MaxValue, ErrorMessage = "El nivel mínimo debe ser un valor positivo.")]
    public int nivel_minimo { get; set; }

    [Required(ErrorMessage = "La fecha de la alerta es obligatoria.")]
    [Column(TypeName = "datetime")]
    [DataType(DataType.DateTime, ErrorMessage = "Formato de fecha inválido.")]
    public DateTime fecha_alerta { get; set; }

    [ForeignKey("id_producto")]
    [InverseProperty("alertas_stocks")]
    public virtual producto id_productoNavigation { get; set; } = null!;
}