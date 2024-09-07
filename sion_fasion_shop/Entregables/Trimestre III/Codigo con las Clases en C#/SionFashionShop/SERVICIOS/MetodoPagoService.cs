using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class MetodoPagoService
    {
        private readonly IREPOSITORIO<MetodoPago> metodoPagoRepo;
        public MetodoPagoService(IREPOSITORIO<MetodoPago> repository)
        {
            this.metodoPagoRepo = repository;
        }
        public void CreateMetodoPago(MetodoPago metodoPago)
        {
            metodoPagoRepo.Add(metodoPago);
        }
        public void UpdateMetodoPago(MetodoPago metodoPago)
        {
            metodoPagoRepo.Update(metodoPago);
        }
        public MetodoPagoService(int id)
        {
            metodoPagoRepo.Delete(id);
        }
        public IEnumerable<MetodoPago> GetAll()
        {
            return metodoPagoRepo.GetAll();
        }
    }
}
