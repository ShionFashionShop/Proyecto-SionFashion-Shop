using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class TiendaRepositorio : IREPOSITORIO<Tienda>
    {
        private readonly List<Tienda> _tiendas = new List<Tienda>();

        public void Add(Tienda tienda)
        {
            _tiendas.Add(tienda);
        }

        public void Update(Tienda tienda)
        {
            var tiendaExistente = _tiendas.FirstOrDefault(t => t.TiendaId == tienda.TiendaId);
            if (tiendaExistente != null)
            {
                tiendaExistente.Nombre = tienda.Nombre;
                tiendaExistente.Direccion= tienda.Direccion;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Tienda GetById(int id)
        {
            return _tiendas.FirstOrDefault(t => t.TiendaId == id);
        }

        public void Delete(int id)
        {
            var tienda = _tiendas.FirstOrDefault(t => t.TiendaId == id);
            if (tienda != null)
            {
                _tiendas.Remove(tienda);
            }
        }

        public IEnumerable<Tienda> GetAll()
        {
            return _tiendas;
        }
    }


}
