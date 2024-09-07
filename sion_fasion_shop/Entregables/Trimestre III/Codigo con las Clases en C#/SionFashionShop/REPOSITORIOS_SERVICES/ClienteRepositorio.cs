using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class ClienteRepositorio : IREPOSITORIO<Cliente>
    {
        private readonly List<Cliente> _clientes = new List<Cliente>();

        public void Add(Cliente cliente)
        {
            _clientes.Add(cliente);
        }

        public void Update(Cliente cliente)
        {
            var clienteExistente = _clientes.FirstOrDefault(c => c.DNI == cliente.DNI);
            if (clienteExistente != null)
            {
                clienteExistente.Nombre = cliente.Nombre;
                clienteExistente.Email = cliente.Email;
                clienteExistente.Telefono = cliente.Telefono;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public Cliente GetById(int id)
        {
            return _clientes.FirstOrDefault(c => c.ClienteId == id);
        }

        public void Delete(int id)
        {
            var cliente = _clientes.FirstOrDefault(c => c.ClienteId == id);
            if (cliente != null)
            {
                _clientes.Remove(cliente);
            }
        }

        public IEnumerable<Cliente> GetAll()
        {
            return _clientes;
        }
    }


}
