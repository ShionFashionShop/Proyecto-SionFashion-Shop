using MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public class MovimientoInventarioRepositorio : IREPOSITORIO<MovimientoInventario>
    {
        private readonly List<MovimientoInventario> _movimientosInventario = new List<MovimientoInventario>();

        public void Add(MovimientoInventario movimiento)
        {
            _movimientosInventario.Add(movimiento);
        }

        public void Update(MovimientoInventario movimiento)
        {
            var movimientoExistente = _movimientosInventario.FirstOrDefault(m => m.MovimientoInventarioId == movimiento.MovimientoInventarioId);
            if (movimientoExistente != null)
            {
                movimientoExistente.TipoMovimiento = movimiento.TipoMovimiento;
                movimientoExistente.FechaHora = movimiento.FechaHora;
                movimientoExistente.Cantidad = movimiento.Cantidad;
                // Actualizar otras propiedades según sea necesario
            }
        }

        public MovimientoInventario GetById(int id)
        {
            return _movimientosInventario.FirstOrDefault(m => m.MovimientoInventarioId == id);
        }

        public void Delete(int id)
        {
            var movimiento = _movimientosInventario.FirstOrDefault(m => m.MovimientoInventarioId == id);
            if (movimiento != null)
            {
                _movimientosInventario.Remove(movimiento);
            }
        }

        public IEnumerable<MovimientoInventario> GetAll()
        {
            return _movimientosInventario;
        }
    }

}
