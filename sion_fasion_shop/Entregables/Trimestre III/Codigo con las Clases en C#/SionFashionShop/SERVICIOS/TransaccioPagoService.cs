using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class TransaccioPagoService
    {
        private readonly IREPOSITORIO<TransaccionPago> transaccionPagoRepo;
        public TransaccioPagoService(IREPOSITORIO<TransaccionPago> repository)
        {
            this.transaccionPagoRepo = repository;
        }
        public void CreateMovimientoInventario(TransaccionPago transaccionPago)
        {
            transaccionPagoRepo.Add(transaccionPago);
        }
        public void UpdateMovimientoInventario(TransaccionPago transaccionPago)
        {
            transaccionPagoRepo.Update(transaccionPago);
        }
        public TransaccioPagoService(int id)
        {
            transaccionPagoRepo.Delete(id);
        }
        public IEnumerable<TransaccionPago> GetAll()
        {
            return transaccionPagoRepo.GetAll();
        }
    }
}
