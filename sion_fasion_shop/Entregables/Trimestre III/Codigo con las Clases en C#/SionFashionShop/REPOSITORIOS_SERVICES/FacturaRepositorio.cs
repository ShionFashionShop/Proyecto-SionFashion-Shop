using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class FacturaRepositorio : IREPOSITORIO<Factura>
    {
        private readonly List<Factura> _facturas = new List<Factura>();

        public void Add(Factura factura)
        {
            _facturas.Add(factura);
        }

        public void Update(Factura factura)
        {
            var facturaExistente = _facturas.FirstOrDefault(f => f.FacturaId == factura.FacturaId);
            if (facturaExistente != null)
            {
                facturaExistente.FechaEmision = factura.FechaEmision;
                facturaExistente.Total = factura.Total;
                facturaExistente.ClienteId = factura.ClienteId;
                facturaExistente.Cliente = factura.Cliente;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Factura GetById(int id)
        {
            return _facturas.FirstOrDefault(f => f.FacturaId == id);
        }

        public void Delete(int id)
        {
            var factura = _facturas.FirstOrDefault(f => f.FacturaId == id);
            if (factura != null)
            {
                _facturas.Remove(factura);
            }
        }

        public IEnumerable<Factura> GetAll()
        {
            return _facturas;
        }
    }

}
