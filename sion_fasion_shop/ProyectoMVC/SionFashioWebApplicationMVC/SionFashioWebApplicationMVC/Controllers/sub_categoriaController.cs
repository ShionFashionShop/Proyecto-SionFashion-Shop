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
    public class sub_categoriaController : Controller
    {
        private readonly ApplicationDbContext _context;

        public sub_categoriaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: sub_categoria
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.sub_categorias.Include(s => s.id_categoriaNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: sub_categoria/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sub_categoria = await _context.sub_categorias
                .Include(s => s.id_categoriaNavigation)
                .FirstOrDefaultAsync(m => m.id_sub_categoria == id);
            if (sub_categoria == null)
            {
                return NotFound();
            }

            return View(sub_categoria);
        }

        // GET: sub_categoria/Create
        public IActionResult Create()
        {
            ViewData["id_categoria"] = new SelectList(_context.categorias, "id_categoria", "id_categoria");
            return View();
        }

        // POST: sub_categoria/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_sub_categoria,nombre_sub_categoria,id_categoria")] sub_categoria sub_categoria)
        {
            if (ModelState.IsValid)
            {
                _context.Add(sub_categoria);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["id_categoria"] = new SelectList(_context.categorias, "id_categoria", "id_categoria", sub_categoria.id_categoria);
            return View(sub_categoria);
        }

        // GET: sub_categoria/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sub_categoria = await _context.sub_categorias.FindAsync(id);
            if (sub_categoria == null)
            {
                return NotFound();
            }
            ViewData["id_categoria"] = new SelectList(_context.categorias, "id_categoria", "id_categoria", sub_categoria.id_categoria);
            return View(sub_categoria);
        }

        // POST: sub_categoria/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_sub_categoria,nombre_sub_categoria,id_categoria")] sub_categoria sub_categoria)
        {
            if (id != sub_categoria.id_sub_categoria)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sub_categoria);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!sub_categoriaExists(sub_categoria.id_sub_categoria))
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
            ViewData["id_categoria"] = new SelectList(_context.categorias, "id_categoria", "id_categoria", sub_categoria.id_categoria);
            return View(sub_categoria);
        }

        // GET: sub_categoria/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sub_categoria = await _context.sub_categorias
                .Include(s => s.id_categoriaNavigation)
                .FirstOrDefaultAsync(m => m.id_sub_categoria == id);
            if (sub_categoria == null)
            {
                return NotFound();
            }

            return View(sub_categoria);
        }

        // POST: sub_categoria/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var sub_categoria = await _context.sub_categorias.FindAsync(id);
            if (sub_categoria != null)
            {
                _context.sub_categorias.Remove(sub_categoria);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool sub_categoriaExists(int id)
        {
            return _context.sub_categorias.Any(e => e.id_sub_categoria == id);
        }
    }
}
