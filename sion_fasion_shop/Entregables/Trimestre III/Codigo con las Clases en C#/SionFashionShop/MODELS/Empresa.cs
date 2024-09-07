using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Empresa
    {
        public int EmpresaId { get; set; }
        public string CodigoEmpresa { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }

        // Relación con Tienda (Composición)
        public ICollection<Tienda> Tiendas { get; set; }
    }
}
