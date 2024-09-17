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
    public class facturasController : Controller
    {
        private readonly ApplicationDbContext _context;

        public facturasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: facturas
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.facturas.Include(f => f.id_clienteNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: facturas/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var factura = await _context.facturas
                .Include(f => f.id_clienteNavigation)
                .FirstOrDefaultAsync(m => m.id_factura == id);
            if (factura == null)
            {
                return NotFound();
            }

            return View(factura);
        }

        // GET: facturas/Create
        public IActionResult Create()
        {
            ViewData["id_cliente"] = new SelectList(_context.clientes, "id_cliente", "id_cliente");
            return View();
        }

        // POST: facturas/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_factura,fecha_emision_factura,sub_total_factura,impuesto_factura,total_factura,id_cliente")] factura factura)
        {
            if (ModelState.IsValid)
            {
                _context.Add(factura);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_cliente"] = new SelectList(_context.clientes, "id_cliente", "id_cliente", factura.id_cliente);
            return View(factura);
        }

        // GET: facturas/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var factura = await _context.facturas.FindAsync(id);
            if (factura == null)
            {
                return NotFound();
            }
            ViewData["id_cliente"] = new SelectList(_context.clientes, "id_cliente", "id_cliente", factura.id_cliente);
            return View(factura);
        }

        // POST: facturas/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_factura,fecha_emision_factura,sub_total_factura,impuesto_factura,total_factura,id_cliente")] factura factura)
        {
            if (id != factura.id_factura)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(factura);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!facturaExists(factura.id_factura))
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
            ViewData["id_cliente"] = new SelectList(_context.clientes, "id_cliente", "id_cliente", factura.id_cliente);
            return View(factura);
        }

        // GET: facturas/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var factura = await _context.facturas
                .Include(f => f.id_clienteNavigation)
                .FirstOrDefaultAsync(m => m.id_factura == id);
            if (factura == null)
            {
                return NotFound();
            }

            return View(factura);
        }

        // POST: facturas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var factura = await _context.facturas.FindAsync(id);
            if (factura != null)
            {
                _context.facturas.Remove(factura);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool facturaExists(int id)
        {
            return _context.facturas.Any(e => e.id_factura == id);
        }
    }
}
