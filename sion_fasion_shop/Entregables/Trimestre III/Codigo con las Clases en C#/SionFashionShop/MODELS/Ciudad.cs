using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Ciudad
    {
        public int CiudadId { get; set; }
        public string CodigoCiudad { get; set; }
        public string CodigoPostal { get; set; }
        public string Nombre { get; set; }

        // Relación con Departamento (Agregación)
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }

        // Relación con Tienda (Composición)
        public ICollection<Tienda> Tiendas { get; set; } = new List<Tienda>();
    }
}
