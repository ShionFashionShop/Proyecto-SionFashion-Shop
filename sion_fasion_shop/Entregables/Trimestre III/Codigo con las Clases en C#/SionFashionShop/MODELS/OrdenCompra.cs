using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class OrdenCompra
    {
        public int OrdenCompraId { get; set; }
        public DateTime FechaOrdenCompra { get; set; }
        public string Estado { get; set; }
        public decimal Total { get; set; }

        // Relación con Cliente (Agregación)
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        // Relación con OrdenCompraProducto (Composición)
        public ICollection<OrdenCompraProducto> OrdenesCompraProducto { get; set; }
    }
}
