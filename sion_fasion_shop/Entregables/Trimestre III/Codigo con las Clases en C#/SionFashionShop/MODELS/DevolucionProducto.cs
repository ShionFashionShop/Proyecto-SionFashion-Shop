using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class DevolucionProducto
    {
        public int DevolucionProductoId { get; set; }
        public int DevolucionId { get; set; }
        public Devolucion Devolucion { get; set; }

        public int ProductoId { get; set; }
        public Producto Producto { get; set; }

        public int Cantidad { get; set; }
    }
}
