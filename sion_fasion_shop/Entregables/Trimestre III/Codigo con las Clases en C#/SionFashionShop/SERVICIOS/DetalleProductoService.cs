using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
     public class DetalleProductoService
    {
        private readonly IREPOSITORIO<DetalleProducto> detalleProductoRepositorio;

        public  DetalleProductoService(IREPOSITORIO<DetalleProducto> repository)
        {
            this.detalleProductoRepositorio = repository;
        }

        public void CreateDetalleProducto(DetalleProducto detalleProducto)
        {
            detalleProductoRepositorio.Add(detalleProducto);
        }
        public void UpdateDetalleProducto(DetalleProducto detalleProducto)
        {
            detalleProductoRepositorio.Update(detalleProducto);
        }

        public DetalleProductoService(int id)
        {
            detalleProductoRepositorio.Delete(id);
        }
        public IEnumerable<DetalleProducto> GetAll()
        {
            return detalleProductoRepositorio.GetAll();
        }

    }
}
