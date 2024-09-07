using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    using System.Collections.Generic;
    using System.Linq;

    public class EmpleadoRepositorio : IREPOSITORIO<Empleado>
    {
        private readonly List<Empleado> _empleados = new List<Empleado>();

        public void Add(Empleado empleado)
        {
            _empleados.Add(empleado);
        }

        public void Update(Empleado empleado)
        {
            var empleadoExistente = _empleados.FirstOrDefault(e => e.EmpleadoId == empleado.EmpleadoId);
            if (empleadoExistente != null)
            {
                empleadoExistente.DNI = empleado.DNI;
                empleadoExistente.Nombre = empleado.Nombre;
                empleadoExistente.Apellidos = empleado.Apellidos;
                empleadoExistente.Telefono = empleado.Telefono;
                empleadoExistente.Email = empleado.Email;
                empleadoExistente.TiendaId = empleado.TiendaId;
                empleadoExistente.SupervisorId = empleado.SupervisorId;
                empleadoExistente.Cajeros = empleado.Cajeros;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Empleado GetById(int id)
        {
            return _empleados.FirstOrDefault(e => e.EmpleadoId == id);
        }

        public void Delete(int id)
        {
            var empleado = _empleados.FirstOrDefault(e => e.EmpleadoId == id);
            if (empleado != null)
            {
                _empleados.Remove(empleado);
            }
        }

        public IEnumerable<Empleado> GetAll()
        {
            return _empleados;
        }
    }




}
