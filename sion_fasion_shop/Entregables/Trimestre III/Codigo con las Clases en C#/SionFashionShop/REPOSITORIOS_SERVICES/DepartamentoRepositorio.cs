using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class DepartamentoRepositorio : IREPOSITORIO<Departamento>
    {
        private readonly List<Departamento> _departamentos = new List<Departamento>();

        public void Add(Departamento departamento)
        {
            _departamentos.Add(departamento);
        }

        public void Update(Departamento departamento)
        {
            var departamentoExistente = _departamentos.FirstOrDefault(d => d.DepartamentoId == departamento.DepartamentoId);
            if (departamentoExistente != null)
            {
                departamentoExistente.Nombre = departamento.Nombre;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Departamento GetById(int id)
        {
            return _departamentos.FirstOrDefault(d => d.DepartamentoId == id);
        }

        public void Delete(int id)
        {
            var departamento = _departamentos.FirstOrDefault(d => d.DepartamentoId == id);
            if (departamento != null)
            {
                _departamentos.Remove(departamento);
            }
        }

        public IEnumerable<Departamento> GetAll()
        {
            return _departamentos;
        }
    }


}
