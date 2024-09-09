using System;
using System.Collections.Generic;
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
            var applicationDbContext = _context.ciudades.Include(c => c.id_departamentoNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Ciudades/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ciudade = await _context.ciudades
                .Include(c => c.id_departamentoNavigation)
                .FirstOrDefaultAsync(m => m.id_ciudad == id);
            if (ciudade == null)
            {
                return NotFound();
            }

            return View(ciudade);
        }

        // GET: Ciudades/Create
        public IActionResult Create()
        {
            ViewData["id_departamento"] = new SelectList(_context.departamentos, "id_departamento", "id_departamento");
            return View();
        }

        // POST: Ciudades/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_ciudad,nombre_ciudad,id_departamento")] ciudade ciudade)
        {
            if (ModelState.IsValid)
            {
                _context.Add(ciudade);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_departamento"] = new SelectList(_context.departamentos, "id_departamento", "id_departamento", ciudade.id_departamento);
            return View(ciudade);
        }

        // GET: Ciudades/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ciudade = await _context.ciudades.FindAsync(id);
            if (ciudade == null)
            {
                return NotFound();
            }
            ViewData["id_departamento"] = new SelectList(_context.departamentos, "id_departamento", "id_departamento", ciudade.id_departamento);
            return View(ciudade);
        }

        // POST: Ciudades/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_ciudad,nombre_ciudad,id_departamento")] ciudade ciudade)
        {
            if (id != ciudade.id_ciudad)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(ciudade);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ciudadeExists(ciudade.id_ciudad))
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
            ViewData["id_departamento"] = new SelectList(_context.departamentos, "id_departamento", "id_departamento", ciudade.id_departamento);
            return View(ciudade);
        }

        // GET: Ciudades/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ciudade = await _context.ciudades
                .Include(c => c.id_departamentoNavigation)
                .FirstOrDefaultAsync(m => m.id_ciudad == id);
            if (ciudade == null)
            {
                return NotFound();
            }

            return View(ciudade);
        }

        // POST: Ciudades/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var ciudade = await _context.ciudades.FindAsync(id);
            if (ciudade != null)
            {
                _context.ciudades.Remove(ciudade);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ciudadeExists(int id)
        {
            return _context.ciudades.Any(e => e.id_ciudad == id);
        }
    }
}
