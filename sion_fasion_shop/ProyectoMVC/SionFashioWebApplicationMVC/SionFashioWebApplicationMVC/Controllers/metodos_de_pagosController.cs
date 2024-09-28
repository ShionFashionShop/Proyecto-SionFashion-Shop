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
    public class metodos_de_pagosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public metodos_de_pagosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: metodos_de_pagos
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.metodos_de_pagos.Include(m => m.id_facturaNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: metodos_de_pagos/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var metodos_de_pago = await _context.metodos_de_pagos
                .Include(m => m.id_facturaNavigation)
                .FirstOrDefaultAsync(m => m.id_metodo_pago == id);
            if (metodos_de_pago == null)
            {
                return NotFound();
            }

            return View(metodos_de_pago);
        }

        // GET: metodos_de_pagos/Create
        public IActionResult Create()
        {
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura");
            return View();
        }

        // POST: metodos_de_pagos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_metodo_pago,metodo_pago,id_factura")] metodos_de_pago metodos_de_pago)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(metodos_de_pago);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura", metodos_de_pago.id_factura);
            return View(metodos_de_pago);
        }

        // GET: metodos_de_pagos/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var metodos_de_pago = await _context.metodos_de_pagos.FindAsync(id);
            if (metodos_de_pago == null)
            {
                return NotFound();
            }
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura", metodos_de_pago.id_factura);
            return View(metodos_de_pago);
        }

        // POST: metodos_de_pagos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_metodo_pago,metodo_pago,id_factura")] metodos_de_pago metodos_de_pago)
        {
            if (id != metodos_de_pago.id_metodo_pago)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(metodos_de_pago);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!metodos_de_pagoExists(metodos_de_pago.id_metodo_pago))
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
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura", metodos_de_pago.id_factura);
            return View(metodos_de_pago);
        }

        // GET: metodos_de_pagos/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var metodos_de_pago = await _context.metodos_de_pagos
                .Include(m => m.id_facturaNavigation)
                .FirstOrDefaultAsync(m => m.id_metodo_pago == id);
            if (metodos_de_pago == null)
            {
                return NotFound();
            }

            return View(metodos_de_pago);
        }

        // POST: metodos_de_pagos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var metodos_de_pago = await _context.metodos_de_pagos.FindAsync(id);
            if (metodos_de_pago != null)
            {
                _context.metodos_de_pagos.Remove(metodos_de_pago);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool metodos_de_pagoExists(int id)
        {
            return _context.metodos_de_pagos.Any(e => e.id_metodo_pago == id);
        }
    }
}
