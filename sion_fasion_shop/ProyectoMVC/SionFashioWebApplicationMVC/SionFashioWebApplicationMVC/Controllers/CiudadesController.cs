using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SionFashioWebApplicationMVC.Datos;
using SionFashioWebApplicationMVC.Models;

namespace SionFashioWebApplicationMVC.Controllers
{
    public class CiudadesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CiudadesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Ciudades
        public async Task<IActionResult> Index()
        {
            var ciudades = await _context.ciudades
                .Include(c => c.id_departamentoNavigation) // Include related department data
                .ToListAsync();
            return View(ciudades);
        }

        // GET: Ciudades/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ciudad = await _context.ciudades
                .Include(c => c.id_departamentoNavigation) // Include related department data
                .FirstOrDefaultAsync(m => m.id_ciudad == id);

            if (ciudad == null)
            {
                return NotFound();
            }

            return View(ciudad);
        }

        // GET: Ciudades/Create
        public IActionResult Create()
        {
            ViewData["id_departamento"] = new SelectList(_context.departamentos, "id_departamento", "nombre_departamento");
            return View();
        }

        // POST: Ciudades/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_ciudad,nombre_ciudad,id_departamento")] ciudade ciudad)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(ciudad);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_departamento"] = new SelectList(_context.departamentos, "id_departamento", "nombre_departamento", ciudad.id_departamento);
            return View(ciudad);
        }

        // GET: Ciudades/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ciudad = await _context.ciudades.FindAsync(id);
            if (ciudad == null)
            {
                return NotFound();
            }

            ViewData["id_departamento"] = new SelectList(_context.departamentos, "id_departamento", "nombre_departamento", ciudad.id_departamento);
            return View(ciudad);
        }

        // POST: Ciudades/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_ciudad,nombre_ciudad,id_departamento")] ciudade ciudad)
        {
            if (id != ciudad.id_ciudad)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(ciudad);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ciudadExists(ciudad.id_ciudad))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }

            ViewData["id_departamento"] = new SelectList(_context.departamentos, "id_departamento", "nombre_departamento", ciudad.id_departamento);
            return View(ciudad);
        }

        // GET: Ciudades/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ciudad = await _context.ciudades
                .Include(c => c.id_departamentoNavigation) // Include related department data
                .FirstOrDefaultAsync(m => m.id_ciudad == id);

            if (ciudad == null)
            {
                return NotFound();
            }

            return View(ciudad);
        }

        // POST: Ciudades/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var ciudad = await _context.ciudades.FindAsync(id);

            if (ciudad != null)
            {
                _context.ciudades.Remove(ciudad);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        private bool ciudadExists(int id)
        {
            return _context.ciudades.Any(e => e.id_ciudad == id);
        }
    }
}