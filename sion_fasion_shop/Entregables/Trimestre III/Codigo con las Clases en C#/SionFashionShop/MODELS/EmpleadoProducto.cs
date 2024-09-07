using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class EmpleadoProducto
    {
        public int EmpleadoId { get; set; }
        public Empleado Empleado { get; set; }

        public int ProductoId { get; set; }
        public Producto Producto { get; set; }

        public DateTime FechaAsignacion { get; set; }
    }
}
