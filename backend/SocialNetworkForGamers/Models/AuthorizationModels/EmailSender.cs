using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System.Threading.Tasks;

namespace SocialNetworkForGamers.Models.AuthorizationModels
{
    public class EmailSender
    {
        private readonly IConfiguration _config;

        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendAsync(string toEmail, string htmlBody)
        {
            var email = new MimeMessage();

            email.From.Add(new MailboxAddress("Social Network for Gamers", _config["SmtpSettings:From"]));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = "Повідомлення від нашого сервісу";

            email.Body = new TextPart("html")
            {
                Text = htmlBody
            };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
                _config["SmtpSettings:Host"],
                int.Parse(_config["SmtpSettings:Port"]),
                SecureSocketOptions.StartTls
            );

            await smtp.AuthenticateAsync(
                _config["SmtpSettings:From"],
                _config["SmtpSettings:Password"]
            );

            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}
