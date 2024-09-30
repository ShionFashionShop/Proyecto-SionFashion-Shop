using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SionFashioWebApplicationMVC.Models.ViewModels;

namespace SionFashioWebApplicationMVC.Controllers
{

    
    public class RolesController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public RolesController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }


        public IActionResult Index()
        {
            var roles = _roleManager.Roles; // Obtén los roles desde el RoleManager
            return View(roles); // Pasar los roles como IEnumerable<IdentityRole>
        }


        public IActionResult Create()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(RolViewModel model)
        {
            if (ModelState.IsValid)
            {
                IdentityRole role = new IdentityRole { Name = model.Name };
                IdentityResult result = await _roleManager.CreateAsync(role);
                {
                    if (result.Succeeded)
                    {
                        return RedirectToAction("Index");
                    }
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(" ", error.Description);
                    }

                }
            }
            return View(model);
        }

        // GET: Roles/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return NotFound();
            }

            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            // Mapeo del IdentityRole al RolViewModel
            RolViewModel model = new RolViewModel
            {
                Id = role.Id,
                Name = role.Name
            };

            return View(model);
        }

        // POST: Roles/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(RolViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Busca el rol por su ID
                var role = await _roleManager.FindByIdAsync(model.Id);
                if (role == null)
                {
                    return NotFound();
                }

                // Actualiza el nombre del rol
                role.Name = model.Name;

                // Intenta actualizar el rol en la base de datos
                var result = await _roleManager.UpdateAsync(role);
                if (result.Succeeded)
                {
                    TempData["SuccessMessage"] = "El rol se ha actualizado correctamente.";
                    return RedirectToAction("Index");
                }

                // Si hay errores, los agregamos al ModelState
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);  // Corregido el parámetro vacío
                }
            }

            // Si llegamos aquí, algo falló, regresamos el modelo con los errores
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Root")] // Aqui solo se habilita al roo solo para eliminar
        public async Task<IActionResult> Delete(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role != null)
            {
                var result = await _roleManager.DeleteAsync(role);
                if (result.Succeeded)
                {
                    return RedirectToAction("Index", new { deletionSuccess = true });
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(" ", error.Description);
                }
            }
            return View("Index");
        }
    }
}
