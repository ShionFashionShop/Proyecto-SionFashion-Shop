using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Factura
    {
        public int FacturaId { get; set; }
        public DateTime FechaEmision { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Impuestos { get; set; }
        public decimal Descuentos { get; set; }
        public decimal Total { get; set; }

        // Relación con Cliente (Agregación)
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        // Relación con DetalleVenta (Composición)
        public ICollection<DetalleVenta> DetallesVenta { get; set; }

        // Relación con TransaccionPago (Agregación)
        public ICollection<TransaccionPago> TransaccionesPago { get; set; }
    }
}
