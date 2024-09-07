using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Tienda
    {
        public int TiendaId { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public ICollection<Empleado> Empleados { get; set; } = new List<Empleado>();
    }

}

