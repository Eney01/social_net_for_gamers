using System;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace SocialNetworkForGamers.Models.AuthorizationModels
{
    public class JwtAuthService : IService
    {
        private readonly string _secretKey;
        private readonly TimeSpan _tokenLifetime;
        private readonly ConcurrentDictionary<string, string> _userTokens = new();

        public JwtAuthService(IConfiguration config, int tokenLifetimeMinutes = 60)
        {
            _secretKey = config["JwtSettings:SecretKey"] ?? throw new ArgumentNullException("SecretKey is missing in configuration");
            _tokenLifetime = TimeSpan.FromMinutes(tokenLifetimeMinutes);
        }


        public string RegisterUser(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId)) throw new ArgumentException("userId cannot be null or empty");
            return GetToken(userId) ?? NewUser(userId);
        }


        public string NewUser(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId)) throw new ArgumentException("userId cannot be null or empty");
            var token = GenerateToken(userId);
            _userTokens[userId] = token;
            return token;
        }


        public string? GetUserIdFromToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token)) return null;

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_secretKey);

                var validationParams = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                tokenHandler.ValidateToken(token, validationParams, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                return jwtToken.Subject;
            }
            catch
            {
                return null;
            }
        }


        public bool RemoveToken(string userId)
        {
            return _userTokens.TryRemove(userId, out _);
        }

        public string? GetToken(string userId)
        {
            return _userTokens.TryGetValue(userId, out var token) ? token : null;
        }

        private string GenerateToken(string userId)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, userId),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.Add(_tokenLifetime),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}