using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class HistorialInventarioRepositorio : IREPOSITORIO<HistorialInventario>
    {
        private readonly List<HistorialInventario> _historialesInventario = new List<HistorialInventario>();

        public void Add(HistorialInventario historial)
        {
            _historialesInventario.Add(historial);
        }

        public void Update(HistorialInventario historial)
        {
            var historialExistente = _historialesInventario.FirstOrDefault(h => h.HistorialInventarioId == historial.HistorialInventarioId);
            if (historialExistente != null)
            {
                historialExistente.FechaRegistro = historial.FechaRegistro;
                historialExistente.CantidadDisponible = historial.CantidadDisponible;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public HistorialInventario GetById(int id)
        {
            return _historialesInventario.FirstOrDefault(h => h.HistorialInventarioId == id);
        }

        public void Delete(int id)
        {
            var historial = _historialesInventario.FirstOrDefault(h => h.HistorialInventarioId == id);
            if (historial != null)
            {
                _historialesInventario.Remove(historial);
            }
        }

        public IEnumerable<HistorialInventario> GetAll()
        {
            return _historialesInventario;
        }
    }

}
