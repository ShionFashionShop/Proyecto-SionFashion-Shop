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
    public class ordenes_productoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ordenes_productoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: ordenes_producto
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.ordenes_productos.Include(o => o.id_orden_compraNavigation).Include(o => o.id_productoNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: ordenes_producto/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ordenes_producto = await _context.ordenes_productos
                .Include(o => o.id_orden_compraNavigation)
                .Include(o => o.id_productoNavigation)
                .FirstOrDefaultAsync(m => m.id_orden_compra == id);
            if (ordenes_producto == null)
            {
                return NotFound();
            }

            return View(ordenes_producto);
        }

        // GET: ordenes_producto/Create
        public IActionResult Create()
        {
            ViewData["id_orden_compra"] = new SelectList(_context.ordenes_de_compras, "id_orden_compra", "id_orden_compra");
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto");
            return View();
        }

        // POST: ordenes_producto/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_orden_compra,id_producto,cantidad")] ordenes_producto ordenes_producto)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(ordenes_producto);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_orden_compra"] = new SelectList(_context.ordenes_de_compras, "id_orden_compra", "id_orden_compra", ordenes_producto.id_orden_compra);
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", ordenes_producto.id_producto);
            return View(ordenes_producto);
        }

        // GET: ordenes_producto/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ordenes_producto = await _context.ordenes_productos.FindAsync(id);
            if (ordenes_producto == null)
            {
                return NotFound();
            }
            ViewData["id_orden_compra"] = new SelectList(_context.ordenes_de_compras, "id_orden_compra", "id_orden_compra", ordenes_producto.id_orden_compra);
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", ordenes_producto.id_producto);
            return View(ordenes_producto);
        }

        // POST: ordenes_producto/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_orden_compra,id_producto,cantidad")] ordenes_producto ordenes_producto)
        {
            if (id != ordenes_producto.id_orden_compra)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(ordenes_producto);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ordenes_productoExists(ordenes_producto.id_orden_compra))
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
            ViewData["id_orden_compra"] = new SelectList(_context.ordenes_de_compras, "id_orden_compra", "id_orden_compra", ordenes_producto.id_orden_compra);
            ViewData["id_producto"] = new SelectList(_context.productos, "id_producto", "id_producto", ordenes_producto.id_producto);
            return View(ordenes_producto);
        }

        // GET: ordenes_producto/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ordenes_producto = await _context.ordenes_productos
                .Include(o => o.id_orden_compraNavigation)
                .Include(o => o.id_productoNavigation)
                .FirstOrDefaultAsync(m => m.id_orden_compra == id);
            if (ordenes_producto == null)
            {
                return NotFound();
            }

            return View(ordenes_producto);
        }

        // POST: ordenes_producto/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var ordenes_producto = await _context.ordenes_productos.FindAsync(id);
            if (ordenes_producto != null)
            {
                _context.ordenes_productos.Remove(ordenes_producto);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ordenes_productoExists(int id)
        {
            return _context.ordenes_productos.Any(e => e.id_orden_compra == id);
        }
    }
}
