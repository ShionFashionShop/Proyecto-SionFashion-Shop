using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class PaisRepositorio : IREPOSITORIO<Pais>
    {
        private readonly List<Pais> _paises = new List<Pais>();

        public void Add(Pais pais)
        {
            _paises.Add(pais);
        }

        public void Update(Pais pais)
        {
            var paisExistente = _paises.FirstOrDefault(p => p.PaisId == pais.PaisId);
            if (paisExistente != null)
            {
                paisExistente.Nombre = pais.Nombre;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Pais GetById(int id)
        {
            return _paises.FirstOrDefault(p => p.PaisId == id);
        }

        public void Delete(int id)
        {
            var pais = _paises.FirstOrDefault(p => p.PaisId == id);
            if (pais != null)
            {
                _paises.Remove(pais);
            }
        }

        public IEnumerable<Pais> GetAll()
        {
            return _paises;
        }
    }
}

