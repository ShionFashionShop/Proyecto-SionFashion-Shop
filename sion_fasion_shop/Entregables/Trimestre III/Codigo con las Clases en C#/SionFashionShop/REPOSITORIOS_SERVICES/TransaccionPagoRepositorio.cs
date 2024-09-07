using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class TransaccionPagoRepositorio : IREPOSITORIO<TransaccionPago>
    {
        private readonly List<TransaccionPago> _transaccionesPago = new List<TransaccionPago>();

        public void Add(TransaccionPago transaccionPago)
        {
            _transaccionesPago.Add(transaccionPago);
        }

        public void Update(TransaccionPago transaccionPago)
        {
            var transaccionExistente = _transaccionesPago.FirstOrDefault(t => t.TransaccionPagoId == transaccionPago.TransaccionPagoId);
            if (transaccionExistente != null)
            {
                transaccionExistente.FechaPago = transaccionPago.FechaPago;
                transaccionExistente.MontoPagado = transaccionPago.MontoPagado;
                transaccionExistente.Estado = transaccionPago.Estado;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public TransaccionPago GetById(int id)
        {
            return _transaccionesPago.FirstOrDefault(t => t.TransaccionPagoId == id);
        }

        public void Delete(int id)
        {
            var transaccionPago = _transaccionesPago.FirstOrDefault(t => t.TransaccionPagoId == id);
            if (transaccionPago != null)
            {
                _transaccionesPago.Remove(transaccionPago);
            }
        }

        public IEnumerable<TransaccionPago> GetAll()
        {
            return _transaccionesPago;
        }
    }

}
