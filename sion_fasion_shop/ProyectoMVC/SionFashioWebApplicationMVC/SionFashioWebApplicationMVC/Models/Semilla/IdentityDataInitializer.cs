using Microsoft.AspNetCore.Identity;
using NuGet.Packaging.Signing;

namespace SionFashioWebApplicationMVC.Models.Semilla
{
    public static class IdentityDataInitializer
    {
        public static async Task SeedData(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>(); // Cambiado a IdentityRole

            await EnsureRoleAsync(roleManager, "Root");

            await EnsureUserAsync(userManager, "superusuario@sionfashionshop.com", "Sionfashionsho2p.", "Root");
        }

        private static async Task EnsureRoleAsync(RoleManager<IdentityRole> roleManager, string roleName)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        private static async Task EnsureUserAsync(UserManager<IdentityUser> userManager, string username, string password, string roleName)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null)
            {
                user = new IdentityUser { UserName = username, Email = username };
                var createUserResult = await userManager.CreateAsync(user, password);
                if (createUserResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, roleName);
                }
            }
        }
    }
}
