using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Devolucion
    {
        public int DevolucionId { get; set; }
        public DateTime FechaDevolucion { get; set; }
        public string Motivo { get; set; }
        public string Estado { get; set; }
        public decimal MontoDevolucion { get; set; }

        // Relación con Cliente (Asociación)
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        // Relación con DevolucionProducto (Composición)
        public ICollection<DevolucionProducto> DevolucionesProducto { get; set; }
    }
}
