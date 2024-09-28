using Microsoft.AspNetCore.Identity.UI.Services;
using System.Threading.Tasks;

namespace SionFashioWebApplicationMVC.Servicess
{
    public class FakeEmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            // Log the email to the console or to a file for testing purposes
            Console.WriteLine($"Sending email to {email} with subject {subject}");
            return Task.CompletedTask;
        }
    }
}
