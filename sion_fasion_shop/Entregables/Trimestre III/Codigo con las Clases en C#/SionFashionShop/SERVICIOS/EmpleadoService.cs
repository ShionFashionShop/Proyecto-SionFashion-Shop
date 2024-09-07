using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class EmpleadoService
    {
        private readonly IREPOSITORIO<Empleado> empleadoRepo;

        public EmpleadoService(IREPOSITORIO<Empleado> repository)
        {
            this.empleadoRepo = repository;
        }
        public void CreateDevolucion(Empleado empleado)
        {
            empleadoRepo.Add(empleado);
        }
        public void UpdateDevolucion(Empleado empleado)
        {
            empleadoRepo.Update(empleado);
        }
        public EmpleadoService(int id)
        {
            empleadoRepo.Delete(id);
        }
        public IEnumerable<Empleado> GetAll()
        {
            return empleadoRepo.GetAll();
        }
    }
}
