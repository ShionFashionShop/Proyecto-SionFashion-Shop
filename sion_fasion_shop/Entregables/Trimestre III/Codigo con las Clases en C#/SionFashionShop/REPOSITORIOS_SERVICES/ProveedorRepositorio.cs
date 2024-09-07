using MODELS;

namespace REPOSITORIOS
{
    public class ProveedorRepositorio : IREPOSITORIO<Proveedor>
    {
        private readonly List<Proveedor> _proveedores = new List<Proveedor>();

        public void Add(Proveedor proveedor)
        {
            _proveedores.Add(proveedor);
        }

        public void Update(Proveedor proveedor)
        {
            var proveedorExistente = _proveedores.FirstOrDefault(p => p.CodigoProveedor == proveedor.CodigoProveedor);
            if (proveedorExistente != null)
            {
                proveedorExistente.Nombre= proveedor.Nombre;
                proveedorExistente.Contacto = proveedor.Contacto;
                proveedorExistente.Email = proveedor.Email;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Proveedor GetById(int id)
        {
            return _proveedores.FirstOrDefault(p => p.ProveedorId == id);
        }

        public void Delete(int id)
        {
            var proveedor = _proveedores.FirstOrDefault(p => p.ProveedorId == id);
            if (proveedor != null)
            {
                _proveedores.Remove(proveedor);
            }
        }

        public IEnumerable<Proveedor> GetAll()
        {
            return _proveedores;
        }
    }


}
