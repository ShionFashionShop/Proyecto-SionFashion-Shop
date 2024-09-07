using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS
{
    public class Empleado
    {
        public int EmpleadoId { get; set; }
        public string DNI { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }


        // Relación con Tienda (Agregación)
        public int TiendaId { get; set; }
        public Tienda Tienda { get; set; }


        // Relación con Empleado (Supervisor)
        public int? SupervisorId { get; set; }
        public Empleado Supervisor { get; set; }


        // Relación con Empleado (Cajeros) Composicion
        //Aquí, Cajeros es una colección de Empleados que están bajo la supervisión directa del empleado 
        //    principal.Los empleados cajeros existen como parte del 
        //    ciclo de vida del empleado principal y pueden ser manipulados directamente por él.
        public ICollection<Empleado> Cajeros { get; set; } = new List<Empleado>();
    }


}
