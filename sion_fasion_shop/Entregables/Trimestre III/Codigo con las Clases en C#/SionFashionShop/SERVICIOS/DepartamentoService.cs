using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class DepartamentoService
    {
        private readonly IREPOSITORIO<Departamento> departamentoRepositorio;


        public DepartamentoService(IREPOSITORIO<Departamento> repository)
        {
            this.departamentoRepositorio= repository;

        }

        public void CreateDepartamento(Departamento departamento)
        {
            departamentoRepositorio.Add(departamento);
        }

        public void UpdateDepartamento(Departamento departamento)
        {
            departamentoRepositorio.Update(departamento);
        }
        public DepartamentoService(int id)
        {
            departamentoRepositorio.Delete(id);
        }
        public IEnumerable<Departamento> GetAll()
        {
            return departamentoRepositorio.GetAll();
        }
    }

}
