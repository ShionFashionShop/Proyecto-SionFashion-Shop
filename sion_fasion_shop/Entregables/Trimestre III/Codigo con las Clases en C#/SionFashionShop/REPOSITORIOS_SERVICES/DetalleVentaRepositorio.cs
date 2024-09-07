using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class DetalleVentaRepositorio : IREPOSITORIO<DetalleVenta>
    {
        private readonly List<DetalleVenta> _detallesVenta = new List<DetalleVenta>();

        public void Add(DetalleVenta detalleVenta)
        {
            _detallesVenta.Add(detalleVenta);
        }

        public void Update(DetalleVenta detalleVenta)
        {
            var detalleExistente = _detallesVenta.FirstOrDefault(d => d.DetalleVentaId == detalleVenta.DetalleVentaId);
            if (detalleExistente != null)
            {
                detalleExistente.Cantidad = detalleVenta.Cantidad;
                detalleExistente.PrecioUnitario = detalleVenta.PrecioUnitario;
                detalleExistente.Subtotal = detalleVenta.Subtotal;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public DetalleVenta GetById(int id)
        {
            return _detallesVenta.FirstOrDefault(d => d.DetalleVentaId == id);
        }

        public void Delete(int id)
        {
            var detalleVenta = _detallesVenta.FirstOrDefault(d => d.DetalleVentaId == id);
            if (detalleVenta != null)
            {
                _detallesVenta.Remove(detalleVenta);
            }
        }

        public IEnumerable<DetalleVenta> GetAll()
        {
            return _detallesVenta;
        }
    }

}
