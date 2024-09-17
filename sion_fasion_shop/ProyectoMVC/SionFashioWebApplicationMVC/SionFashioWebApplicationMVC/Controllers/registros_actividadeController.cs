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
    public class registros_actividadeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public registros_actividadeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: registros_actividade
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.registros_actividades.Include(r => r.id_usuarioNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: registros_actividade/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var registros_actividade = await _context.registros_actividades
                .Include(r => r.id_usuarioNavigation)
                .FirstOrDefaultAsync(m => m.id_registro == id);
            if (registros_actividade == null)
            {
                return NotFound();
            }

            return View(registros_actividade);
        }

        // GET: registros_actividade/Create
        public IActionResult Create()
        {
            ViewData["id_usuario"] = new SelectList(_context.usuarios, "id_usuario", "id_usuario");
            return View();
        }

        // POST: registros_actividade/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_registro,id_usuario,actividad,fecha_actividad")] registros_actividade registros_actividade)
        {
            if (ModelState.IsValid)
            {
                _context.Add(registros_actividade);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_usuario"] = new SelectList(_context.usuarios, "id_usuario", "id_usuario", registros_actividade.id_usuario);
            return View(registros_actividade);
        }

        // GET: registros_actividade/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var registros_actividade = await _context.registros_actividades.FindAsync(id);
            if (registros_actividade == null)
            {
                return NotFound();
            }
            ViewData["id_usuario"] = new SelectList(_context.usuarios, "id_usuario", "id_usuario", registros_actividade.id_usuario);
            return View(registros_actividade);
        }

        // POST: registros_actividade/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_registro,id_usuario,actividad,fecha_actividad")] registros_actividade registros_actividade)
        {
            if (id != registros_actividade.id_registro)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(registros_actividade);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!registros_actividadeExists(registros_actividade.id_registro))
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
            ViewData["id_usuario"] = new SelectList(_context.usuarios, "id_usuario", "id_usuario", registros_actividade.id_usuario);
            return View(registros_actividade);
        }

        // GET: registros_actividade/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var registros_actividade = await _context.registros_actividades
                .Include(r => r.id_usuarioNavigation)
                .FirstOrDefaultAsync(m => m.id_registro == id);
            if (registros_actividade == null)
            {
                return NotFound();
            }

            return View(registros_actividade);
        }

        // POST: registros_actividade/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var registros_actividade = await _context.registros_actividades.FindAsync(id);
            if (registros_actividade != null)
            {
                _context.registros_actividades.Remove(registros_actividade);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool registros_actividadeExists(int id)
        {
            return _context.registros_actividades.Any(e => e.id_registro == id);
        }
    }
}
