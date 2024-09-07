using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Cliente
    {
        public int ClienteId { get; set; }
        public string DNI { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }

        // Relación con Venta (Agregación)
        public ICollection<Venta> Ventas { get; set; }

        // Relación con Devolucion (Agregación)
        public ICollection<Devolucion> Devoluciones { get; set; }
    }
}
