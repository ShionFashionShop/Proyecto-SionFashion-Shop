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
    public class inventariosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public inventariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: inventarios
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.inventarios.Include(i => i.id_productoNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: inventarios/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var inventario = await _context.inventarios
                .Include(i => i.id_productoNavigation)
                .FirstOrDefaultAsync(m => m.id_producto == id);
            if (inventario == null)
            {
                return NotFound();
            }

            return View(inventario);
        }

        // GET: inventarios/Create
        public IActionResult Create()
        {
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto");
            return View();
        }

        // POST: inventarios/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_producto,stock_inicial,stock_actual,saldo")] inventario inventario)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(inventario);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", inventario.id_producto);
            return View(inventario);
        }

        // GET: inventarios/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var inventario = await _context.inventarios.FindAsync(id);
            if (inventario == null)
            {
                return NotFound();
            }
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", inventario.id_producto);
            return View(inventario);
        }

        // POST: inventarios/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_producto,stock_inicial,stock_actual,saldo")] inventario inventario)
        {
            if (id != inventario.id_producto)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(inventario);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!inventarioExists(inventario.id_producto))
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
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", inventario.id_producto);
            return View(inventario);
        }

        // GET: inventarios/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var inventario = await _context.inventarios
                .Include(i => i.id_productoNavigation)
                .FirstOrDefaultAsync(m => m.id_producto == id);
            if (inventario == null)
            {
                return NotFound();
            }

            return View(inventario);
        }

        // POST: inventarios/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var inventario = await _context.inventarios.FindAsync(id);
            if (inventario != null)
            {
                _context.inventarios.Remove(inventario);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool inventarioExists(int id)
        {
            return _context.inventarios.Any(e => e.id_producto == id);
        }
    }
}
