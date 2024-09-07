using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class ProveedorService
    {
        private readonly IREPOSITORIO<Proveedor> proveedorRepo;
        public ProveedorService(IREPOSITORIO<Proveedor> repository)
        {
            this.proveedorRepo = repository;
        }
        public void CreateMovimientoInventario(Proveedor proveedor)
        {
            proveedorRepo.Add(proveedor);
        }
        public void UpdateMovimientoInventario(Proveedor proveedor)
        {
            proveedorRepo.Update(proveedor);
        }
        public ProveedorService(int id)
        {
            proveedorRepo.Delete(id);
        }
        public IEnumerable<Proveedor> GetAll()
        {
            return proveedorRepo.GetAll();
        }
    }
}
