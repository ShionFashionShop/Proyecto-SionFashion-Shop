using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Proveedor
    {
        public int ProveedorId { get; set; }
        public string CodigoProveedor { get; set; }
        public string Nombre { get; set; }
        public string Contacto { get; set; }
        public string Email { get; set; }

        // Relación con Producto (Agregación)
        public ICollection<Producto> Productos { get; set; }
    }
}
