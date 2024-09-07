using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class OrdenCompraProductoService
    {
        private readonly IREPOSITORIO<OrdenCompraProducto> ordenCompraProductoRepo;
        public OrdenCompraProductoService(IREPOSITORIO<OrdenCompraProducto> repository)
        {
            this.ordenCompraProductoRepo = repository;
        }
        public void CreateMovimientoInventario(OrdenCompraProducto ordenCompraProducto)
        {
            ordenCompraProductoRepo.Add(ordenCompraProducto);
        }
        public void UpdateMovimientoInventario(OrdenCompraProducto ordenCompraProducto)
        {
            ordenCompraProductoRepo.Update(ordenCompraProducto);
        }
        public OrdenCompraProductoService(int id)
        {
            ordenCompraProductoRepo.Delete(id);
        }
        public IEnumerable<OrdenCompraProducto> GetAll()
        {
            return ordenCompraProductoRepo.GetAll();
        }
    }
}
