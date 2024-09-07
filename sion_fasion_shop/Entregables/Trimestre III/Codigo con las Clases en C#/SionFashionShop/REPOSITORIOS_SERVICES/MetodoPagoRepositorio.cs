using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class MetodoPagoRepositorio : IREPOSITORIO<MetodoPago>
    {
        private readonly List<MetodoPago> _metodosPago = new List<MetodoPago>();

        public void Add(MetodoPago metodoPago)
        {
            _metodosPago.Add(metodoPago);
        }

        public void Update(MetodoPago metodoPago)
        {
            var metodoExistente = _metodosPago.FirstOrDefault(m => m.CodigoMetodoPago == metodoPago.CodigoMetodoPago);
            if (metodoExistente != null)
            {
                metodoExistente.Nombre = metodoPago.Nombre;
                metodoExistente.Detalles = metodoPago.Detalles;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public MetodoPago GetById(int id)
        {
            return _metodosPago.FirstOrDefault(m => m.MetodoPagoId == id);
        }

        public void Delete(int id)
        {
            var metodoPago = _metodosPago.FirstOrDefault(m => m.MetodoPagoId == id);
            if (metodoPago != null)
            {
                _metodosPago.Remove(metodoPago);
            }
        }

        public IEnumerable<MetodoPago> GetAll()
        {
            return _metodosPago;
        }
    }

}
