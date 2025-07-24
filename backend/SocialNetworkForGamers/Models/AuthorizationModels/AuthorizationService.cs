using SocialNetworkForGamers.Models.AuthorizationModels;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;
using SocialNetworkForGamers.Models.DatabaseModels.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System;
using System.Linq;
using System.Threading.Tasks;
using SocialNetworkForGamers.Models.ChatModels.DTO;

namespace SocialNetworkForGamers.Models.AuthorizationModels
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly AppDbContext _context;
        private readonly JwtAuthService _jwtAuthService;
        private readonly EmailSender _emailSender;

        public AuthorizationService(AppDbContext context, EmailSender emailSender, JwtAuthService jwtAuthService)
        {
            _context = context;
            _jwtAuthService = jwtAuthService;
            _emailSender = emailSender;
        }

        public List<string> GetBackgroundImages()
        {
            return _context.BackgroundImages
                .Select(x => x.Src)
                .ToList();
        }

        public async Task<bool> Registration(string name, string email, string? password, string role = "user", bool isExternal = false)
        {
            try
            {
                email = email.Trim().ToLower();

                if (await IsLoginTaken(email)) return false;

                Account account;

                if (isExternal)
                {
                    account = new Account
                    {
                        Login = email,
                        PasswordHash = null,
                        IsExternal = true
                    };
                }
                else
                {
                    if (string.IsNullOrEmpty(password))
                        return false;

                    account = new Account
                    {
                        Login = email,
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                        IsExternal = false
                    };
                }

                await _context.Accounts.AddAsync(account);
                await _context.SaveChangesAsync();

                var roleObject = await _context.Roles.FirstOrDefaultAsync(x => x.Name == role);

                var user = new User
                {
                    AccountId = account.Id,
                    CreatedAt = DateTime.UtcNow,
                    Email = email,
                    Firstname = name,
                    RoleId = roleObject?.Id ?? 1
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<string?> Authorization(string email, string password)
        {
            email = email.Trim().ToLower();

            var account = await _context.Accounts.FirstOrDefaultAsync(x => x.Login == email);

            if (account == null)
                return null;

            if (account.IsExternal)
                return null;

            if (!BCrypt.Net.BCrypt.Verify(password, account.PasswordHash))
                return null;

            var user = await _context.Users.FirstOrDefaultAsync(x => x.AccountId == account.Id);
            if (user == null) return null;

            return _jwtAuthService.NewUser(user.Id.ToString());
        }

        public async Task<bool> IsLoginTaken(string email)
        {
            email = email.Trim().ToLower();
            return await _context.Accounts.AnyAsync(x => x.Login == email);
        }

        public int? GetUserId(string token)
        {
            var userIdStr = _jwtAuthService.GetUserIdFromToken(token);
            return int.TryParse(userIdStr, out var userId) ? userId : null;
        }

        public async Task<UserDto?> GetUserByToken(string token)
        {
            var userId = GetUserId(token);
            if (userId == null) return null;
            User user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null) return null;
            UserDto userDto = new UserDto()
            {
                Id = user.Id,
                Avatar = user.AvatarUrl,
                FirstName = user.Firstname
            };
            return userDto;
        }

        public async Task<bool> RecoverPassword(string email)
        {
            email = email.Trim().ToLower();

            var account = await _context.Accounts.FirstOrDefaultAsync(x => x.Login == email);
            if (account == null || account.IsExternal)
                return false;

            var user = await _context.Users.FirstOrDefaultAsync(x => x.AccountId == account.Id);
            if (user == null) return false;

            var token = _jwtAuthService.NewUser(user.Id.ToString());
            var resetLink = $"https://localhost:3000/authorization/reset-password/{token}";

            var emailHtml = GeneratePasswordResetEmail(user.Firstname, resetLink);
            await _emailSender.SendAsync(email, emailHtml);

            return true;
        }

        public async Task<bool> SetNewPassword(string token, string password)
        {
            string? userIdStr = _jwtAuthService.GetUserIdFromToken(token);
            if (userIdStr == null) return false;

            if (!int.TryParse(userIdStr, out var userId)) return false;

            _jwtAuthService.RemoveToken(userId.ToString());

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null) return false;

            var account = await _context.Accounts.FirstOrDefaultAsync(x => x.Id == user.AccountId);
            if (account == null) return false;

            if (account.IsExternal)
                return false;

            account.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<string?> ExternalLoginOrRegistration(string provider, string name, string email)
        {
            email = email.Trim().ToLower();

            var account = await _context.Accounts.FirstOrDefaultAsync(x => x.Login == email);

            if (account != null)
            {
                if (!account.IsExternal)
                {
                    return null;
                }
            }
            else
            {
                account = new Account
                {
                    Login = email,
                    PasswordHash = null,
                    IsExternal = true,
                };

                await _context.Accounts.AddAsync(account);
                await _context.SaveChangesAsync();

                var roleObject = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "user");

                var user = new User
                {
                    AccountId = account.Id,
                    CreatedAt = DateTime.UtcNow,
                    Email = email,
                    Firstname = name,
                    RoleId = roleObject?.Id ?? null
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
            }

            var userFinal = await _context.Users.FirstOrDefaultAsync(x => x.AccountId == account.Id);
            if (userFinal == null)
                return null;

            return _jwtAuthService.NewUser(userFinal.Id.ToString());
        }

        private string GeneratePasswordResetEmail(string username, string resetLink)
        {
            return $@"
<html lang='uk'>
  <body style='font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; color: #333;'>
    <div style='max-width: 600px; margin: auto; background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);'>
      <h2 style='color: #2c3e50;'>Привіт, {username}!</h2>
      <p style='margin: 16px 0;'>Ви запросили скидання пароля до вашого акаунта.</p>
      <p style='margin: 16px 0;'>Щоб змінити пароль, натисніть на кнопку нижче (доступно на протязі 60 хвилин):</p>
      <a href='{resetLink}' style='display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;'>Скинути пароль</a>
      <p style='margin: 16px 0;'>Якщо ви не надсилали цей запит — просто проігноруйте лист.</p>
      <div style='margin-top: 30px; font-size: 0.9em; color: #777;'>
        <p>З повагою,<br>Команда підтримки<br>Social Network for Gamers</p>
      </div>
    </div>
  </body>
</html>";
        }
    }
}
