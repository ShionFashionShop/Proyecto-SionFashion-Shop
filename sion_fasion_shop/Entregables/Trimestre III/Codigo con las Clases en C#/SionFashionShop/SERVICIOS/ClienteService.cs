using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class ClienteService
    {
        private readonly IREPOSITORIO<Cliente> clienteRepositorio;

        public ClienteService(IREPOSITORIO<Cliente> repository)
        {
            this.clienteRepositorio = repository;
        }

        public void CreateCliente(Cliente cliente)
        {
            clienteRepositorio.Add(cliente);
        }
        public void UpdateCliente(Cliente cliente)
        {
            clienteRepositorio.Update(cliente);
        }
        public ClienteService(int id)
        {
            clienteRepositorio.Delete(id);
        }
        public IEnumerable<Cliente> GetAll()
        {
            return clienteRepositorio.GetAll();
        }

    }
}
