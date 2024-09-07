using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class OrdenCompraProducto
    {
        public int OrdenCompraProductoId { get; set; }
        public int OrdenCompraId { get; set; }
        public OrdenCompra OrdenCompra { get; set; }

        public int ProductoId { get; set; }
        public Producto Producto { get; set; }

        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
    }
}
