using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class PaisService
    {
        private readonly IREPOSITORIO<Pais> paisRepo;
        public PaisService(IREPOSITORIO<Pais> repository)
        {
            this.paisRepo = repository;
        }
        public void CreateMovimientoInventario(Pais pais)
        {
            paisRepo.Add(pais);
        }
        public void UpdateMovimientoInventario(Pais pais)
        {
            paisRepo.Update(pais);
        }
        public PaisService(int id)
        {
            paisRepo.Delete(id);
        }
        public IEnumerable<Pais> GetAll()
        {
            return paisRepo.GetAll();
        }
    }
}
