using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Venta
    {
        public int VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Total { get; set; }

        // Relación con Cliente (Composición)
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        // Relación con VentaProducto (Composición)
        public ICollection<VentaProducto> VentasProducto { get; set; }
    }
}
