using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class OrdenCompraRepositorio : IREPOSITORIO<OrdenCompra>
    {
        private readonly List<OrdenCompra> _ordenesCompra = new List<OrdenCompra>();

        public void Add(OrdenCompra ordenCompra)
        {
            _ordenesCompra.Add(ordenCompra);
        }

        public void Update(OrdenCompra ordenCompra)
        {
            var ordenExistente = _ordenesCompra.FirstOrDefault(
                o => o.OrdenCompraId == ordenCompra.OrdenCompraId);
            if (ordenExistente != null)
            {
                ordenExistente.FechaOrdenCompra = ordenCompra.FechaOrdenCompra;
                ordenExistente.Estado = ordenCompra.Estado;
                ordenExistente.Total = ordenCompra.Total;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public OrdenCompra GetById(int id)
        {
            return _ordenesCompra.FirstOrDefault(o => o.OrdenCompraId == id);
        }

        public void Delete(int id)
        {
            var ordenCompra = _ordenesCompra.FirstOrDefault(o => o.OrdenCompraId == id);
            if (ordenCompra != null)
            {
                _ordenesCompra.Remove(ordenCompra);
            }
        }

        public IEnumerable<OrdenCompra> GetAll()
        {
            return _ordenesCompra;
        }
    }

}
