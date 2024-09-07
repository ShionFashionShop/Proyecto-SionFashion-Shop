using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class DetalleVentaService
    {
        private readonly IREPOSITORIO<DetalleVenta> detalleVentaRepo;

        public DetalleVentaService(IREPOSITORIO<DetalleVenta> repository)
        {
            this.detalleVentaRepo = repository;
        }
        public void CreateDetalleVenta(DetalleVenta detalleVenta)
        {
            detalleVentaRepo.Add(detalleVenta);
        }
        public void UpdateDetalleVenta(DetalleVenta detalleVenta)
        {
            detalleVentaRepo.Update(detalleVenta);
        }
        public DetalleVentaService(int id)
        {
            detalleVentaRepo.Delete(id);
        }
        public IEnumerable<DetalleVenta> GetAll()
        {
            return detalleVentaRepo.GetAll();
        }
    }
}
