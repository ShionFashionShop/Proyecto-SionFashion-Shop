using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class VentaService
    {
        private readonly IREPOSITORIO<Venta> ventaRepo;
        public VentaService(IREPOSITORIO<Venta> repository)
        {
            this.ventaRepo = repository;
        }
        public void CreateMovimientoInventario(Venta venta)
        {
            ventaRepo.Add(venta);
        }
        public void UpdateMovimientoInventario(Venta venta)
        {
            ventaRepo.Update(venta);
        }
        public VentaService(int id)
        {
            ventaRepo.Delete(id);
        }
        public IEnumerable<Venta> GetAll()
        {
            return ventaRepo.GetAll();
        }
    }
}
