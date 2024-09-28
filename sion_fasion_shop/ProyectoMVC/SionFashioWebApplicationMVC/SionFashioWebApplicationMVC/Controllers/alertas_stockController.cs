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
    public class alertas_stockController : Controller
    {
        private readonly ApplicationDbContext _context;

        public alertas_stockController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: alertas_stock
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.alertas_stocks.Include(a => a.id_productoNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: alertas_stock/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var alertas_stock = await _context.alertas_stocks
                .Include(a => a.id_productoNavigation)
                .FirstOrDefaultAsync(m => m.id_alerta == id);
            if (alertas_stock == null)
            {
                return NotFound();
            }

            return View(alertas_stock);
        }

        // GET: alertas_stock/Create
        public IActionResult Create()
        {
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto");
            return View();
        }

        // POST: alertas_stock/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_alerta,id_producto,nivel_minimo,fecha_alerta")] alertas_stock alertas_stock)
        {
            // if (ModelState.IsValid)
            {
                _context.Add(alertas_stock);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", alertas_stock.id_producto);
            return View(alertas_stock);
        }

        // GET: alertas_stock/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var alertas_stock = await _context.alertas_stocks.FindAsync(id);
            if (alertas_stock == null)
            {
                return NotFound();
            }
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", alertas_stock.id_producto);
            return View(alertas_stock);
        }

        // POST: alertas_stock/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_alerta,id_producto,nivel_minimo,fecha_alerta")] alertas_stock alertas_stock)
        {
            if (id != alertas_stock.id_alerta)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(alertas_stock);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!alertas_stockExists(alertas_stock.id_alerta))
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
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", alertas_stock.id_producto);
            return View(alertas_stock);
        }

        // GET: alertas_stock/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var alertas_stock = await _context.alertas_stocks
                .Include(a => a.id_productoNavigation)
                .FirstOrDefaultAsync(m => m.id_alerta == id);
            if (alertas_stock == null)
            {
                return NotFound();
            }

            return View(alertas_stock);
        }

        // POST: alertas_stock/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var alertas_stock = await _context.alertas_stocks.FindAsync(id);
            if (alertas_stock != null)
            {
                _context.alertas_stocks.Remove(alertas_stock);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool alertas_stockExists(int id)
        {
            return _context.alertas_stocks.Any(e => e.id_alerta == id);
        }
    }
}
