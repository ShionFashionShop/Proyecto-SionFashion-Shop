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
    public class ordenes_de_compraController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ordenes_de_compraController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: ordenes_de_compra
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.ordenes_de_compras.Include(o => o.id_clienteNavigation).Include(o => o.id_empleadoNavigation).Include(o => o.id_facturaNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: ordenes_de_compra/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ordenes_de_compra = await _context.ordenes_de_compras
                .Include(o => o.id_clienteNavigation)
                .Include(o => o.id_empleadoNavigation)
                .Include(o => o.id_facturaNavigation)
                .FirstOrDefaultAsync(m => m.id_orden_compra == id);
            if (ordenes_de_compra == null)
            {
                return NotFound();
            }

            return View(ordenes_de_compra);
        }

        // GET: ordenes_de_compra/Create
        public IActionResult Create()
        {
            ViewData["id_cliente"] = new SelectList(_context.clientes, "id_cliente", "id_cliente");
            ViewData["id_empleado"] = new SelectList(_context.empleados, "id_empleado", "id_empleado");
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura");
            return View();
        }

        // POST: ordenes_de_compra/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_orden_compra,id_cliente,id_factura,id_empleado")] ordenes_de_compra ordenes_de_compra)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(ordenes_de_compra);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_cliente"] = new SelectList(_context.clientes, "id_cliente", "id_cliente", ordenes_de_compra.id_cliente);
            ViewData["id_empleado"] = new SelectList(_context.empleados, "id_empleado", "id_empleado", ordenes_de_compra.id_empleado);
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura", ordenes_de_compra.id_factura);
            return View(ordenes_de_compra);
        }

        // GET: ordenes_de_compra/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ordenes_de_compra = await _context.ordenes_de_compras.FindAsync(id);
            if (ordenes_de_compra == null)
            {
                return NotFound();
            }
            ViewData["id_cliente"] = new SelectList(_context.clientes, "id_cliente", "id_cliente", ordenes_de_compra.id_cliente);
            ViewData["id_empleado"] = new SelectList(_context.empleados, "id_empleado", "id_empleado", ordenes_de_compra.id_empleado);
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura", ordenes_de_compra.id_factura);
            return View(ordenes_de_compra);
        }

        // POST: ordenes_de_compra/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_orden_compra,id_cliente,id_factura,id_empleado")] ordenes_de_compra ordenes_de_compra)
        {
            if (id != ordenes_de_compra.id_orden_compra)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(ordenes_de_compra);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ordenes_de_compraExists(ordenes_de_compra.id_orden_compra))
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
            ViewData["id_cliente"] = new SelectList(_context.clientes, "id_cliente", "id_cliente", ordenes_de_compra.id_cliente);
            ViewData["id_empleado"] = new SelectList(_context.empleados, "id_empleado", "id_empleado", ordenes_de_compra.id_empleado);
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura", ordenes_de_compra.id_factura);
            return View(ordenes_de_compra);
        }

        // GET: ordenes_de_compra/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ordenes_de_compra = await _context.ordenes_de_compras
                .Include(o => o.id_clienteNavigation)
                .Include(o => o.id_empleadoNavigation)
                .Include(o => o.id_facturaNavigation)
                .FirstOrDefaultAsync(m => m.id_orden_compra == id);
            if (ordenes_de_compra == null)
            {
                return NotFound();
            }

            return View(ordenes_de_compra);
        }

        // POST: ordenes_de_compra/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var ordenes_de_compra = await _context.ordenes_de_compras.FindAsync(id);
            if (ordenes_de_compra != null)
            {
                _context.ordenes_de_compras.Remove(ordenes_de_compra);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ordenes_de_compraExists(int id)
        {
            return _context.ordenes_de_compras.Any(e => e.id_orden_compra == id);
        }
    }
}
