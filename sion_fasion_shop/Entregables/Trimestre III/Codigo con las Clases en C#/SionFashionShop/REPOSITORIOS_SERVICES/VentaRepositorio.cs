using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class VentaRepositorio : IREPOSITORIO<Venta>
    {
        private readonly List<Venta> _ventas = new List<Venta>();

        public void Add(Venta venta)
        {
            _ventas.Add(venta);
        }

        public void Update(Venta venta)
        {
            var ventaExistente = _ventas.FirstOrDefault(v => v.VentaId == venta.VentaId);
            if (ventaExistente != null)
            {
                ventaExistente.Fecha = venta.Fecha;
                ventaExistente.ClienteId = venta.ClienteId;
               
                ventaExistente.Total = venta.Total;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public void Delete(int id)
        {
            var venta = _ventas.FirstOrDefault(v => v.VentaId == id);
            if (venta != null)
            {
                _ventas.Remove(venta);
            }
        }

        public IEnumerable<Venta> GetAll()
        {
            return _ventas;
        }

        public Venta GetById(int id)
        {
            return _ventas.FirstOrDefault(v => v.VentaId == id);
        }
    }

}
