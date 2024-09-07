using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class OrdenCompraService
    {
        private readonly IREPOSITORIO<OrdenCompra> ordenCompraRepo;
        public OrdenCompraService(IREPOSITORIO<OrdenCompra> repository)
        {
            this.ordenCompraRepo = repository;
        }
        public void CreateMovimientoInventario(OrdenCompra ordenCompra)
        {
            ordenCompraRepo.Add(ordenCompra);
        }
        public void UpdateMovimientoInventario(OrdenCompra ordenCompra)
        {
            ordenCompraRepo.Update(ordenCompra);
        }
        public OrdenCompraService(int id)
        {
            ordenCompraRepo.Delete(id);
        }
        public IEnumerable<OrdenCompra> GetAll()
        {
            return ordenCompraRepo.GetAll();
        }
    }
}
