using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class DetalleProducto
    {
        public int DetalleProductoId { get; set; }
        public string CodigoDetalleProducto { get; set; }
        public string Talla { get; set; }
        public string Color { get; set; }
        public int Stock { get; set; }

        // Relación con Producto (Asociación)
        public int ProductoId { get; set; }
        public Producto Producto { get; set; }
    }
}
