using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Pais
    {
        public int PaisId { get; set; }
        public string CodigoPais { get; set; }
        public string Nombre { get; set; }

        // Relación con Departamento (Composición)
        public ICollection<Departamento> Departamentos { get; set; }
    }
}
