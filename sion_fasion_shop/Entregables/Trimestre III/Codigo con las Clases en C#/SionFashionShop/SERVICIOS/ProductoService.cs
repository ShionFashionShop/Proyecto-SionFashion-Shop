using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class ProductoService
    {
        private readonly IREPOSITORIO<Producto> productoRepo;
        public ProductoService(IREPOSITORIO<Producto> repository)
        {
            this.productoRepo = repository;
        }
        public void CreateMovimientoInventario(Producto producto)
        {
            productoRepo.Add(producto);
        }
        public void UpdateMovimientoInventario(Producto producto)
        {
            productoRepo.Update(producto);
        }
        public ProductoService(int id)
        {
            productoRepo.Delete(id);
        }
        public IEnumerable<Producto> GetAll()
        {
            return productoRepo.GetAll();
        }
    }
}
