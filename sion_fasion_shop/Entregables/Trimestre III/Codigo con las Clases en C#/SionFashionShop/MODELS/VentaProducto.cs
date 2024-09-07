using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class VentaProducto
    {
        public int VentaProductoId { get; set; }
        public int VentaId { get; set; }
        public Venta Venta { get; set; }

        public int ProductoId { get; set; }
        public Producto Producto { get; set; }

        public int Cantidad { get; set; }
        public decimal PrecioVenta { get; set; }
        public decimal Descuento { get; set; }
        public decimal Subtotal => Cantidad * PrecioVenta * (1 - Descuento);

        // Otros campos según los requerimientos del negocio
        public string Comentario { get; set; }
        public DateTime FechaVenta { get; set; }
    }

}
