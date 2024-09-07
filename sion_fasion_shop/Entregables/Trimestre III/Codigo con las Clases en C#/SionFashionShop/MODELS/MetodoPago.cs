using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class MetodoPago
    {
        public int MetodoPagoId { get; set; }
        public string CodigoMetodoPago { get; set; }
        public string Nombre { get; set; }
        public string Detalles { get; set; }

        // Relación con TransaccionPago (Composición)
        public ICollection<TransaccionPago> TransaccionesPago { get; set; }
    }
}
