using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MODELS;
using REPOSITORIOS;

namespace SERVICIOS
{
    public class CategoriaProductoService
    {
        private readonly IREPOSITORIO<CategoriaProducto> categoriaProductoRepositorio;

        public CategoriaProductoService (IREPOSITORIO<CategoriaProducto> repository)
        {
            this.categoriaProductoRepositorio = repository;
        }
        public void CreateCategoriaProducto (CategoriaProducto categoriaProducto)
        {
            categoriaProductoRepositorio.Add(categoriaProducto);
        }
        public void UpdateCategoriaProducto(CategoriaProducto categoriaProducto)
        {
            categoriaProductoRepositorio.Update(categoriaProducto);
        }
        public CategoriaProductoService(int id)
        {
            categoriaProductoRepositorio.Delete(id);
        }
        public IEnumerable<CategoriaProducto> GetAllAdministradores()
        {
            return categoriaProductoRepositorio.GetAll();
        }



    }
}
