using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class DevolucionService
    {
        private readonly IREPOSITORIO<Devolucion> devolucionRepo;

        public DevolucionService(IREPOSITORIO<Devolucion> repository)
        {
            this.devolucionRepo = repository;
        }
        public void CreateDevolucion(Devolucion devolucion)
        {
            devolucionRepo.Add(devolucion);
        }
        public void UpdateDevolucion(Devolucion devolucion)
        {
            devolucionRepo.Update(devolucion);
        }
        public DevolucionService(int id)
        {
            devolucionRepo.Delete(id);
        }
        public IEnumerable<Devolucion> GetAll()
        {
            return devolucionRepo.GetAll();
        }

    }
}
