using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class MovimientoInventarioService
    {
        private readonly IREPOSITORIO<MovimientoInventario> movimientoInventarioRepo;
        public MovimientoInventarioService(IREPOSITORIO<MovimientoInventario> repository)
        {
            this.movimientoInventarioRepo = repository;
        }
        public void CreateMovimientoInventario(MovimientoInventario movimientoInventario)
        {
            movimientoInventarioRepo.Add(movimientoInventario);
        }
        public void UpdateMovimientoInventario(MovimientoInventario movimientoInventario)
        {
            movimientoInventarioRepo.Update(movimientoInventario);
        }
        public MovimientoInventarioService(int id)
        {
            movimientoInventarioRepo.Delete(id);
        }
        public IEnumerable<MovimientoInventario> GetAll()
        {
            return movimientoInventarioRepo.GetAll();
        }
    }
}
