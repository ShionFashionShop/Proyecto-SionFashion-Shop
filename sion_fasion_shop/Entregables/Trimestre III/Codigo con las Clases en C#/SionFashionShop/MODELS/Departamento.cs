using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Departamento
    {
        public int DepartamentoId { get; set; }
        public string CodigoDepartamento { get; set; }
        public string Nombre { get; set; }

        // Relación con Pais (Agregación)
        public int PaisId { get; set; }
        public Pais Pais { get; set; }

        // Relación con Ciudad (Composición)
        public ICollection<Ciudad> Ciudades { get; set; } =new List<Ciudad>();
    }
}
