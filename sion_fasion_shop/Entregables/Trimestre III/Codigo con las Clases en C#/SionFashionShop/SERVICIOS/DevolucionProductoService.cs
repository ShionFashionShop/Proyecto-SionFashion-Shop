using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class DevolucionProductoService
    {
        private readonly IREPOSITORIO<DevolucionProducto> devolucionProductoRepo;

        public DevolucionProductoService(IREPOSITORIO<DevolucionProducto> repository)
        {
            this.devolucionProductoRepo = repository;
        }
        public void CreateDevolucion(DevolucionProducto devolucionProducto)
        {
            devolucionProductoRepo.Add(devolucionProducto);
        }
        public void UpdateDevolucion(DevolucionProducto devolucionProducto)
        {
            devolucionProductoRepo.Update(devolucionProducto);
        }
        public DevolucionProductoService(int id)
        {
            devolucionProductoRepo.Delete(id);
        }
        public IEnumerable<DevolucionProducto> GetAll()
        {
            return devolucionProductoRepo.GetAll();
        }
    }
}
