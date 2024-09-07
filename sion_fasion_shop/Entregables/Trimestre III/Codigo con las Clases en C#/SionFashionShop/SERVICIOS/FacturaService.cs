using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class FacturaService
    {
        private readonly IREPOSITORIO<Factura> facturaRepo;
        public FacturaService(IREPOSITORIO<Factura> repository)
        {
            this.facturaRepo= repository;
        }
        public void CreateFactura(Factura factura)
        {
            facturaRepo.Add(factura);
        }
        public void UpdateFactura(Factura factura)
        {
            facturaRepo.Update(factura);
        }
        public FacturaService(int id)
        {
            facturaRepo.Delete(id);
        }
        public IEnumerable<Factura> GetAll()
        {
            return facturaRepo.GetAll();
        }
    }
}
