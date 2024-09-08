using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SionFashioWebApplicationMVC.Datos;
using SionFashioWebApplicationMVC.Models;

namespace SionFashioWebApplicationMVC.Controllers
{
    public class ProveedoresController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProveedoresController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Proveedores
        public async Task<IActionResult> Index()
        {
            var proveedores = _context.proveedores.Include(p => p.id_ciudadNavigation);
            return View(await proveedores.ToListAsync());
        }

        // GET: Proveedores/Details/5
        public async Task<IActionResult> Details(int id)
        {
            var proveedor = await _context.proveedores
                .Include(p => p.id_ciudadNavigation)
                .FirstOrDefaultAsync(m => m.id_proveedor == id);
            if (proveedor == null)
            {
                return NotFound();
            }

            return View(proveedor);
        }

        // GET: Proveedores/Create
        public IActionResult Create()
        {
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "nombre_ciudad");
            return View();
        }

        // POST: Proveedores/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_proveedor,nombre_proveedor,contacto_proveedor,email_proveedor,id_ciudad")] proveedore proveedor)
        {
            if (ModelState.IsValid)
            {
                _context.Add(proveedor);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "nombre_ciudad", proveedor.id_ciudad);
            return View(proveedor);
        }

        // GET: Proveedores/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            var proveedor = await _context.proveedores.FindAsync(id);
            if (proveedor == null)
            {
                return NotFound();
            }
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "nombre_ciudad", proveedor.id_ciudad);
            return View(proveedor);
        }

        // POST: Proveedores/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_proveedor,nombre_proveedor,contacto_proveedor,email_proveedor,id_ciudad")] proveedore proveedor)
        {
            if (id != proveedor.id_proveedor)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(proveedor);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProveedorExists(proveedor.id_proveedor))
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
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "nombre_ciudad", proveedor.id_ciudad);
            return View(proveedor);
        }

        // GET: Proveedores/Delete/5
        public async Task<IActionResult> Delete(int id)
        {
            var proveedor = await _context.proveedores
                .Include(p => p.id_ciudadNavigation)
                .FirstOrDefaultAsync(m => m.id_proveedor == id);
            if (proveedor == null)
            {
                return NotFound();
            }

            return View(proveedor);
        }

        // POST: Proveedores/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var proveedor = await _context.proveedores.FindAsync(id);
            if (proveedor != null)
            {
                _context.proveedores.Remove(proveedor);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool ProveedorExists(int id)
        {
            return _context.proveedores.Any(e => e.id_proveedor == id);
        }
    }
}
