using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class HistorialInventario
    {
        public int HistorialInventarioId { get; set; }
        public DateTime FechaRegistro { get; set; }
        public int CantidadDisponible { get; set; }

        // Relación con MovimientoInventario (Asociación)
        public int MovimientoInventarioId { get; set; }
        public MovimientoInventario MovimientoInventario { get; set; }
    }
}
