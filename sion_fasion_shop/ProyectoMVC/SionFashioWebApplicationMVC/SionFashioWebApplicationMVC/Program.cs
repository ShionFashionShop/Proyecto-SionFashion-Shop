using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SionFashioWebApplicationMVC.Datos;

var builder = WebApplication.CreateBuilder(args);

// Obtén la cadena de conexión
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

// Configura el contexto de la base de datos
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Configura los servicios de identidad
builder.Services.AddDefaultIdentity<IdentityUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = true; // Puedes ajustar esto según tus necesidades
})
.AddEntityFrameworkStores<ApplicationDbContext>();

// Agrega servicios para los controladores y vistas
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages(); // Asegúrate de agregar Razor Pages

var app = builder.Build();

// Configura el pipeline de la aplicación
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication(); // Asegúrate de incluir autenticación
app.UseAuthorization();

// Configuración de las rutas y endpoints
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages(); // Para permitir Razor Pages en tu aplicación

app.Run();
