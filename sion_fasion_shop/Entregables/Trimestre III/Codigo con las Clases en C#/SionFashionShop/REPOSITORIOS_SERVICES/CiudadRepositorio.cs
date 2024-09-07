using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class CiudadRepositorio : IREPOSITORIO<Ciudad>
    {
        private readonly List<Ciudad> _ciudades = new List<Ciudad>();

        public void Add(Ciudad ciudad)
        {
            _ciudades.Add(ciudad);
        }

        public void Update(Ciudad ciudad)
        {
            var ciudadExistente = _ciudades.FirstOrDefault(c => c.CiudadId == ciudad.CiudadId);
            if (ciudadExistente != null)
            {
                ciudadExistente.CiudadId = ciudad.CiudadId;
                ciudadExistente.CodigoCiudad = ciudad.CodigoCiudad;
                ciudadExistente.CodigoPostal = ciudad.CodigoPostal;
                ciudadExistente.Nombre = ciudad.Nombre;
                
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Ciudad GetById(int id)
        {
            return _ciudades.FirstOrDefault(c => c.CiudadId == id);
        }

        public void Delete(int id)
        {
            var ciudad = _ciudades.FirstOrDefault(c => c.CiudadId == id);
            if (ciudad != null)
            {
                _ciudades.Remove(ciudad);
            }
        }

        public IEnumerable<Ciudad> GetAll()
        {
            return _ciudades;
        }
    }

}
