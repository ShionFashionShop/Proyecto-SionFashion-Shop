using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class EmpresaRepositorio : IREPOSITORIO<Empresa>
    {
        private readonly List<Empresa> _empresas = new List<Empresa>();

        public void Add(Empresa empresa)
        {
            _empresas.Add(empresa);
        }

        public void Update(Empresa empresa)
        {
            var empresaExistente = _empresas.FirstOrDefault(e => e.CodigoEmpresa == empresa.CodigoEmpresa);
            if (empresaExistente != null)
            {
                empresaExistente.Nombre = empresa.Nombre;
                empresaExistente.Telefono = empresa.Telefono;
                empresaExistente.Email = empresa.Email;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Empresa GetById(int id)
        {
            return _empresas.FirstOrDefault(e => e.EmpresaId == id);
        }

        public void Delete(int id)
        {
            var empresa = _empresas.FirstOrDefault(e => e.EmpresaId == id);
            if (empresa != null)
            {
                _empresas.Remove(empresa);
            }
        }

        public IEnumerable<Empresa> GetAll()
        {
            return _empresas;
        }
    }

}
