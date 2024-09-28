using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SionFashioWebApplicationMVC.Datos;
using SionFashioWebApplicationMVC.Models;

namespace SionFashioWebApplicationMVC.Controllers
{
    public class EmpleadosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public EmpleadosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Empleados
        public async Task<IActionResult> Index()
        {
            var empleados = await _context.empleados
                .Include(e => e.id_ciudadNavigation)
                .Include(e => e.id_tiendaNavigation)
                .ToListAsync();
            return View(empleados);
        }

        // GET: Empleados/Details/5
        public async Task<IActionResult> Details(int id)
        {
            var empleado = await _context.empleados
                .Include(e => e.id_ciudadNavigation)
                .Include(e => e.id_tiendaNavigation)
                .FirstOrDefaultAsync(e => e.id_empleado == id);

            if (empleado == null)
            {
                return NotFound();
            }

            return View(empleado);
        }

        // GET: Empleados/Create
        public IActionResult Create()
        {
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "nombre_ciudad");
            ViewData["id_tienda"] = new SelectList(_context.tiendas, "id_tienda", "nombre_tienda");
            return View();
        }

        // POST: Empleados/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_empleado,dni_empleado,nombres_empleado,apellidos_empleado,telefono_empleado,email_empleado,id_tienda,id_ciudad")] empleado empleado)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(empleado);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "nombre_ciudad", empleado.id_ciudad);
            ViewData["id_tienda"] = new SelectList(_context.tiendas, "id_tienda", "nombre_tienda", empleado.id_tienda);
            return View(empleado);
        }

        // GET: Empleados/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            var empleado = await _context.empleados.FindAsync(id);
            if (empleado == null)
            {
                return NotFound();
            }
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "nombre_ciudad", empleado.id_ciudad);
            ViewData["id_tienda"] = new SelectList(_context.tiendas, "id_tienda", "nombre_tienda", empleado.id_tienda);
            return View(empleado);
        }

        // POST: Empleados/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_empleado,dni_empleado,nombres_empleado,apellidos_empleado,telefono_empleado,email_empleado,id_tienda,id_ciudad")] empleado empleado)
        {
            if (id != empleado.id_empleado)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(empleado);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EmpleadoExists(empleado.id_empleado))
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
            ViewData["id_ciudad"] = new SelectList(_context.ciudades, "id_ciudad", "nombre_ciudad", empleado.id_ciudad);
            ViewData["id_tienda"] = new SelectList(_context.tiendas, "id_tienda", "nombre_tienda", empleado.id_tienda);
            return View(empleado);
        }

        // GET: Empleados/Delete/5
        public async Task<IActionResult> Delete(int id)
        {
            var empleado = await _context.empleados
                .Include(e => e.id_ciudadNavigation)
                .Include(e => e.id_tiendaNavigation)
                .FirstOrDefaultAsync(e => e.id_empleado == id);
            if (empleado == null)
            {
                return NotFound();
            }

            return View(empleado);
        }

        // POST: Empleados/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var empleado = await _context.empleados.FindAsync(id);
            if (empleado != null)
            {
                _context.empleados.Remove(empleado);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool EmpleadoExists(int id)
        {
            return _context.empleados.Any(e => e.id_empleado == id);
        }
    }
}
