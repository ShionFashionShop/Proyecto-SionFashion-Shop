using MODELS;
using REPOSITORIOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SERVICIOS
{
    public class HistorialInventarioService
    {
        private readonly IREPOSITORIO<HistorialInventario> historialIventarioRepo;
        public HistorialInventarioService(IREPOSITORIO<HistorialInventario> repository)
        {
            this.historialIventarioRepo = repository;
        }
        public void CreateHistorialInventario(HistorialInventario historialInventario)
        {
            historialIventarioRepo.Add(historialInventario);
        }
        public void UpdateHistorialInventario(HistorialInventario historialInventario)
        {
            historialIventarioRepo.Update(historialInventario);
        }
        public HistorialInventarioService(int id)
        {
            historialIventarioRepo.Delete(id);
        }
        public IEnumerable<HistorialInventario> GetAll()
        {
            return historialIventarioRepo.GetAll();
        }
    }
}
