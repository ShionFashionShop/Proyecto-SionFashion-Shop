using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class MovimientoInventario
    {
        public int MovimientoInventarioId { get; set; }
        public DateTime FechaHora { get; set; }
        public int Cantidad { get; set; }
        public TipoMovimiento TipoMovimiento { get; set; }

        // Relación con Empleado (Asociación)
        public int EmpleadoId { get; set; }
        public Empleado Empleado { get; set; }

        // Relación con HistorialInventario (Composición)
        public ICollection<HistorialInventario> HistorialesInventario { get; set; }
    }
}
