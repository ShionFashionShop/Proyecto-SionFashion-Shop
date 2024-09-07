using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class EmpresaService
    {
        private readonly IREPOSITORIO<Empresa> empresaRepo;

        public EmpresaService(IREPOSITORIO<Empresa> repository)
        {
            this.empresaRepo = repository;
        }
        public void CreateDevolucion(Empresa empresa)
        {
            empresaRepo.Add(empresa);
        }
        public void UpdateDevolucion(Empresa empresa)
        {
            empresaRepo.Update(empresa);
        }
        public EmpresaService(int id)
        {
            empresaRepo.Delete(id);
        }
        public IEnumerable<Empresa> GetAll()
        {
            return empresaRepo.GetAll();
        }
    }
}
