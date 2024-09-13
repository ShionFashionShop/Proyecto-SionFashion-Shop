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
    public class historials_inventariosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public historials_inventariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: historials_inventarios
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.historial_inventarios.Include(h => h.id_productoNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: historials_inventarios/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var historial_inventario = await _context.historial_inventarios
                .Include(h => h.id_productoNavigation)
                .FirstOrDefaultAsync(m => m.id_historial_inventario == id);
            if (historial_inventario == null)
            {
                return NotFound();
            }

            return View(historial_inventario);
        }

        // GET: historials_inventarios/Create
        public IActionResult Create()
        {
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto");
            return View();
        }

        // POST: historials_inventarios/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_historial_inventario,id_producto,cantidad,tipo_cambio,fecha_cambio")] historial_inventario historial_inventario)
        {
            if (ModelState.IsValid)
            {
                _context.Add(historial_inventario);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", historial_inventario.id_producto);
            return View(historial_inventario);
        }

        // GET: historials_inventarios/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var historial_inventario = await _context.historial_inventarios.FindAsync(id);
            if (historial_inventario == null)
            {
                return NotFound();
            }
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", historial_inventario.id_producto);
            return View(historial_inventario);
        }

        // POST: historials_inventarios/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_historial_inventario,id_producto,cantidad,tipo_cambio,fecha_cambio")] historial_inventario historial_inventario)
        {
            if (id != historial_inventario.id_historial_inventario)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(historial_inventario);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!historial_inventarioExists(historial_inventario.id_historial_inventario))
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
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", historial_inventario.id_producto);
            return View(historial_inventario);
        }

        // GET: historials_inventarios/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var historial_inventario = await _context.historial_inventarios
                .Include(h => h.id_productoNavigation)
                .FirstOrDefaultAsync(m => m.id_historial_inventario == id);
            if (historial_inventario == null)
            {
                return NotFound();
            }

            return View(historial_inventario);
        }

        // POST: historials_inventarios/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var historial_inventario = await _context.historial_inventarios.FindAsync(id);
            if (historial_inventario != null)
            {
                _context.historial_inventarios.Remove(historial_inventario);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool historial_inventarioExists(int id)
        {
            return _context.historial_inventarios.Any(e => e.id_historial_inventario == id);
        }
    }
}
