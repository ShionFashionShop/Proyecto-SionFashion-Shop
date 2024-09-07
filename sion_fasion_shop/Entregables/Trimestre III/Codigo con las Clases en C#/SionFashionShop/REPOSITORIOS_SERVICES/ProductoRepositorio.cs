using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class ProductoRepositorio : IREPOSITORIO<Producto>
    {
        private readonly List<Producto> _productos = new List<Producto>();

        public void Add(Producto producto)
        {
            _productos.Add(producto);
        }

        public void Update(Producto producto)
        {
            var productoExistente = _productos.FirstOrDefault(p => p.ProductoId == producto.ProductoId);
            if (productoExistente != null)
            {
                productoExistente.Nombre = producto.Nombre;
                productoExistente.Precio = producto.Precio;
                productoExistente.Descripcion = producto.Descripcion;
                productoExistente.DetallesProducto = producto.DetallesProducto;
                
                
                productoExistente.Proveedores = producto.Proveedores;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Producto GetById(int id)
        {
            return _productos.FirstOrDefault(p => p.ProductoId == id);
        }

        public void Delete(int id)
        {
            var producto = _productos.FirstOrDefault(p => p.ProductoId == id);
            if (producto != null)
            {
                _productos.Remove(producto);
            }
        }

        public IEnumerable<Producto> GetAll()
        {
            return _productos;
        }
    }


}
