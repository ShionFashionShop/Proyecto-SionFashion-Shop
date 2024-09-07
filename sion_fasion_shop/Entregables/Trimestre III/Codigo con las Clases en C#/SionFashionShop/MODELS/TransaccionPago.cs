using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class TransaccionPago
    {
        public int TransaccionPagoId { get; set; }
        public DateTime FechaPago { get; set; }
        public decimal MontoPagado { get; set; }
        public string Estado { get; set; }

        // Relación con Factura (Asociación)
        public int FacturaId { get; set; }
        public Factura Factura { get; set; }

        // Relación con MetodoPago (Agregación)
        public int MetodoPagoId { get; set; }
        public MetodoPago MetodoPago { get; set; }
    }
}
