using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class TiendaService
    {
        private readonly IREPOSITORIO<Tienda> tiendaRepo;
        public TiendaService(IREPOSITORIO<Tienda> repository)
        {
            this.tiendaRepo = repository;
        }
        public void CreateMovimientoInventario(Tienda tienda)
        {
            tiendaRepo.Add(tienda);
        }
        public void UpdateMovimientoInventario(Tienda tienda)
        {
            tiendaRepo.Update(tienda);
        }
        public TiendaService(int id)
        {
            tiendaRepo.Delete(id);
        }
        public IEnumerable<Tienda> GetAll()
        {
            return tiendaRepo.GetAll();
        }
    }
}
