using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class CategoriaProductoRepositorio : IREPOSITORIO<CategoriaProducto>
    {
        private readonly List<CategoriaProducto> _categorias = new List<CategoriaProducto>();

        public void Add(CategoriaProducto categoria)
        {
            _categorias.Add(categoria);
        }

        public void Update(CategoriaProducto categoria)
        {
            var categoriaExistente = _categorias.FirstOrDefault(c => c.CategoriaProductoId == categoria.CategoriaProductoId);
            if (categoriaExistente != null)
            {
                categoriaExistente.Nombre = categoria.Nombre;
                categoriaExistente.Descripcion = categoria.Descripcion;
                categoriaExistente.Estado = categoria.Estado;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public CategoriaProducto GetById(int id)
        {
            return _categorias.FirstOrDefault(c => c.CategoriaProductoId == id);
        }

        public void Delete(int id)
        {
            var categoria = _categorias.FirstOrDefault(c => c.CategoriaProductoId == id);
            if (categoria != null)
            {
                _categorias.Remove(categoria);
            }
        }

        public IEnumerable<CategoriaProducto> GetAll()
        {
            return _categorias;
        }
    }

}
