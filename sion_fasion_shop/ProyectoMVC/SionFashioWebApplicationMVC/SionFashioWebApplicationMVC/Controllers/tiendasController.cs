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
    public class tiendasController : Controller
    {
        private readonly ApplicationDbContext _context;

        public tiendasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: tiendas
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.tiendas.Include(t => t.id_ciudadNavigation).Include(t => t.id_empresaNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: tiendas/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tienda = await _context.tiendas
                .Include(t => t.id_ciudadNavigation)
                .Include(t => t.id_empresaNavigation)
                .FirstOrDefaultAsync(m => m.id_tienda == id);
            if (tienda == null)
            {
                return NotFound();
            }

            return View(tienda);
        }

        // GET: tiendas/Create
        public IActionResult Create()
        {
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "id_ciudad");
            ViewData["id_empresa"] = new SelectList(_context.empresas, "id_empresa", "id_empresa");
            return View();
        }

        // POST: tiendas/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_tienda,nombre_tienda,telefono_tienda,ubicacion_tienda,id_ciudad,id_empresa")] tienda tienda)
        {
            if (ModelState.IsValid)
            {
                _context.Add(tienda);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "id_ciudad", tienda.id_ciudad);
            ViewData["id_empresa"] = new SelectList(_context.empresas, "id_empresa", "id_empresa", tienda.id_empresa);
            return View(tienda);
        }

        // GET: tiendas/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tienda = await _context.tiendas.FindAsync(id);
            if (tienda == null)
            {
                return NotFound();
            }
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "id_ciudad", tienda.id_ciudad);
            ViewData["id_empresa"] = new SelectList(_context.empresas, "id_empresa", "id_empresa", tienda.id_empresa);
            return View(tienda);
        }

        // POST: tiendas/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_tienda,nombre_tienda,telefono_tienda,ubicacion_tienda,id_ciudad,id_empresa")] tienda tienda)
        {
            if (id != tienda.id_tienda)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tienda);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!tiendaExists(tienda.id_tienda))
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
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "id_ciudad", tienda.id_ciudad);
            ViewData["id_empresa"] = new SelectList(_context.empresas, "id_empresa", "id_empresa", tienda.id_empresa);
            return View(tienda);
        }

        // GET: tiendas/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tienda = await _context.tiendas
                .Include(t => t.id_ciudadNavigation)
                .Include(t => t.id_empresaNavigation)
                .FirstOrDefaultAsync(m => m.id_tienda == id);
            if (tienda == null)
            {
                return NotFound();
            }

            return View(tienda);
        }

        // POST: tiendas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var tienda = await _context.tiendas.FindAsync(id);
            if (tienda != null)
            {
                _context.tiendas.Remove(tienda);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool tiendaExists(int id)
        {
            return _context.tiendas.Any(e => e.id_tienda == id);
        }
    }
}
