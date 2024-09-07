
using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class CiudadService
    {
        private readonly IREPOSITORIO<Ciudad> ciudadRepositorio;

        public CiudadService(IREPOSITORIO<Ciudad> repository)
        {
            this.ciudadRepositorio = repository;
        }
        public void CreateCiudad(Ciudad ciudad)
        {
            ciudadRepositorio.Add(ciudad);
        }
        public void UpdateCiudad(Ciudad ciudad)
        {
            ciudadRepositorio.Update(ciudad);
        }
        public CiudadService(int id)
        {
            ciudadRepositorio.Delete(id);
        }
        public IEnumerable<Ciudad> GetAllAdministradores()
        {
            return ciudadRepositorio.GetAll();
        }
    }
}
