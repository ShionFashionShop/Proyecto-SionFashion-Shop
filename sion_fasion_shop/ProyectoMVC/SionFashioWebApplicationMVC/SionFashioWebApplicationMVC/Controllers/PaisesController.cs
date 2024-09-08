using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SionFashioWebApplicationMVC.Datos;
using SionFashioWebApplicationMVC.Models;
using System.Linq;
using System.Threading.Tasks;

namespace SionFashioWebApplicationMVC.Controllers
{
    public class PaisesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PaisesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Paises
        public async Task<IActionResult> Index()
        {
            return View(await _context.paises.ToListAsync());
        }

        // GET: Paises/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var paise = await _context.paises
                .FirstOrDefaultAsync(m => m.id_pais == id);
            if (paise == null)
            {
                return NotFound();
            }

            return View(paise);
        }

        // GET: Paises/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Paises/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_pais,nombre_pais")] paise paise)
        {
            if (ModelState.IsValid)
            {
                _context.Add(paise);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(paise);
        }

        // GET: Paises/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var paise = await _context.paises.FindAsync(id);
            if (paise == null)
            {
                return NotFound();
            }
            return View(paise);
        }

        // POST: Paises/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_pais,nombre_pais")] paise paise)
        {
            if (id != paise.id_pais)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(paise);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PaiseExists(paise.id_pais))
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
            return View(paise);
        }

        // GET: Paises/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var paise = await _context.paises
                .FirstOrDefaultAsync(m => m.id_pais == id);
            if (paise == null)
            {
                return NotFound();
            }

            return View(paise);
        }

        // POST: Paises/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var paise = await _context.paises.FindAsync(id);
            _context.paises.Remove(paise);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PaiseExists(int id)
        {
            return _context.paises.Any(e => e.id_pais == id);
        }
    }
}
