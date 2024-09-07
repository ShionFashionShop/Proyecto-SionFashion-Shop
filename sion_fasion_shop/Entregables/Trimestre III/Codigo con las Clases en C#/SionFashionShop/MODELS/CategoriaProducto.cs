using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class CategoriaProducto
    {
        public int CategoriaProductoId { get; set; }
        public string CodigoCategoriaProducto { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public bool Estado { get; set; } // Estado de la categoría (activo/inactivo)

        // Relación con Producto (Composición)
        public ICollection<Producto> Productos { get; set; }
    }
}
