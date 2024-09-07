using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class VentaProductoService
    {
        private readonly IREPOSITORIO<VentaProducto> ventaProductoRepo;
        public VentaProductoService(IREPOSITORIO<VentaProducto> repository)
        {
            this.ventaProductoRepo = repository;
        }
        public void CreateMovimientoInventario(VentaProducto ventaProducto)
        {
            ventaProductoRepo.Add(ventaProducto);
        }
        public void UpdateMovimientoInventario(VentaProducto ventaProducto)
        {
            ventaProductoRepo.Update(ventaProducto);
        }
        public VentaProductoService(int id)
        {
            ventaProductoRepo.Delete(id);
        }
        public IEnumerable<VentaProducto> GetAll()
        {
            return ventaProductoRepo.GetAll();
        }
    }
}
