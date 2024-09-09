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
    public class productosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public productosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: productos
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.productos.Include(p => p.id_facturaNavigation).Include(p => p.id_proveedorNavigation).Include(p => p.id_sub_categoriaNavigation).Include(p => p.id_tiendaNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: productos/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var producto = await _context.productos
                .Include(p => p.id_facturaNavigation)
                .Include(p => p.id_proveedorNavigation)
                .Include(p => p.id_sub_categoriaNavigation)
                .Include(p => p.id_tiendaNavigation)
                .FirstOrDefaultAsync(m => m.id_producto == id);
            if (producto == null)
            {
                return NotFound();
            }

            return View(producto);
        }

        // GET: productos/Create
        public IActionResult Create()
        {
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura");
            ViewData["id_proveedor"] = new SelectList(_context.proveedores, "id_proveedor", "id_proveedor");
            ViewData["id_sub_categoria"] = new SelectList(_context.sub_categorias, "id_sub_categoria", "id_sub_categoria");
            ViewData["id_tienda"] = new SelectList(_context.tiendas, "id_tienda", "id_tienda");
            return View();
        }

        // POST: productos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_producto,nombre_producto,descripcion_producto,precio_producto,unidad_medida,peso_del_producto,ubicacion_producto,id_sub_categoria,id_proveedor,id_tienda,id_factura")] producto producto)
        {
            if (ModelState.IsValid)
            {
                _context.Add(producto);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura", producto.id_factura);
            ViewData["id_proveedor"] = new SelectList(_context.proveedores, "id_proveedor", "id_proveedor", producto.id_proveedor);
            ViewData["id_sub_categoria"] = new SelectList(_context.sub_categorias, "id_sub_categoria", "id_sub_categoria", producto.id_sub_categoria);
            ViewData["id_tienda"] = new SelectList(_context.tiendas, "id_tienda", "id_tienda", producto.id_tienda);
            return View(producto);
        }

        // GET: productos/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var producto = await _context.productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura", producto.id_factura);
            ViewData["id_proveedor"] = new SelectList(_context.proveedores, "id_proveedor", "id_proveedor", producto.id_proveedor);
            ViewData["id_sub_categoria"] = new SelectList(_context.sub_categorias, "id_sub_categoria", "id_sub_categoria", producto.id_sub_categoria);
            ViewData["id_tienda"] = new SelectList(_context.tiendas, "id_tienda", "id_tienda", producto.id_tienda);
            return View(producto);
        }

        // POST: productos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_producto,nombre_producto,descripcion_producto,precio_producto,unidad_medida,peso_del_producto,ubicacion_producto,id_sub_categoria,id_proveedor,id_tienda,id_factura")] producto producto)
        {
            if (id != producto.id_producto)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(producto);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!productoExists(producto.id_producto))
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
            ViewData["id_factura"] = new SelectList(_context.facturas, "id_factura", "id_factura", producto.id_factura);
            ViewData["id_proveedor"] = new SelectList(_context.proveedores, "id_proveedor", "id_proveedor", producto.id_proveedor);
            ViewData["id_sub_categoria"] = new SelectList(_context.sub_categorias, "id_sub_categoria", "id_sub_categoria", producto.id_sub_categoria);
            ViewData["id_tienda"] = new SelectList(_context.tiendas, "id_tienda", "id_tienda", producto.id_tienda);
            return View(producto);
        }

        // GET: productos/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var producto = await _context.productos
                .Include(p => p.id_facturaNavigation)
                .Include(p => p.id_proveedorNavigation)
                .Include(p => p.id_sub_categoriaNavigation)
                .Include(p => p.id_tiendaNavigation)
                .FirstOrDefaultAsync(m => m.id_producto == id);
            if (producto == null)
            {
                return NotFound();
            }

            return View(producto);
        }

        // POST: productos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var producto = await _context.productos.FindAsync(id);
            if (producto != null)
            {
                _context.productos.Remove(producto);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool productoExists(int id)
        {
            return _context.productos.Any(e => e.id_producto == id);
        }
    }
}
