using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using SionFashioWebApplicationMVC.Datos;
using SionFashioWebApplicationMVC.Models.Semilla;
using SionFashioWebApplicationMVC.Servicess;

var builder = WebApplication.CreateBuilder(args);

// Obtén la cadena de conexión
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

// Configura el contexto de la base de datos
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Registra la implementación de IEmailSender
builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration.GetSection("AuthMessageSenderOptions"));
builder.Services.AddTransient<IEmailSender, EmailSender>();

// Configura los servicios de identidad, incluyendo roles
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = true; // Puedes ajustar esto según tus necesidades
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Agrega servicios para los controladores y vistas
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages(); // Asegúrate de agregar Razor Pages

var app = builder.Build();

//---------------------------------------------------
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        // Aquí puedes inicializar datos relacionados con roles y usuarios
        await IdentityDataInitializer.SeedData(services);
        var context = services.GetRequiredService<ApplicationDbContext>();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred seeding the DB.");
    }
}

//-------------------------------------------------------------------------------------------------

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
