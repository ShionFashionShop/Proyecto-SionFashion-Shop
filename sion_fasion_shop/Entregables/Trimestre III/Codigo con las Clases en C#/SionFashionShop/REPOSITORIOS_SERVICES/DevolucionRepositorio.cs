using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class DevolucionRepositorio : IREPOSITORIO<Devolucion>
    {
        private readonly List<Devolucion> _devoluciones = new List<Devolucion>();

        public void Add(Devolucion devolucion)
        {
            _devoluciones.Add(devolucion);
        }

        public void Update(Devolucion devolucion)
        {
            var devolucionExistente = _devoluciones.FirstOrDefault(d => d.DevolucionId == devolucion.DevolucionId);
            if (devolucionExistente != null)
            {
                devolucionExistente.FechaDevolucion = devolucion.FechaDevolucion;
                devolucionExistente.Motivo = devolucion.Motivo;
                devolucionExistente.Estado = devolucion.Estado;
                devolucionExistente.MontoDevolucion = devolucion.MontoDevolucion;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Devolucion GetById(int id)
        {
            return _devoluciones.FirstOrDefault(d => d.DevolucionId == id);
        }

        public void Delete(int id)
        {
            var devolucion = _devoluciones.FirstOrDefault(d => d.DevolucionId == id);
            if (devolucion != null)
            {
                _devoluciones.Remove(devolucion);
            }
        }

        public IEnumerable<Devolucion> GetAll()
        {
            return _devoluciones;
        }
    }


}
