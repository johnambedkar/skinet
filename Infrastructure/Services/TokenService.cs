using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
            
        }

        public string CreateToken(AppUser user)
        {
            // 1st prepare claims
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.DisplayName)
            };

            // 2nd signing key algorithm
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            // HmacSha512Signature: algorithm used to encrypt the key.

            //3rd describe token. what we want inside our token.

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7), // because we are developing giving 7 days.
                SigningCredentials = creds,
                Issuer = _config["Token:Issuer"] // must be issued by the server, then only the token is validated by server.
            };

            // 4th handle the token/ write the jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token); // the format that jwt.io site represents and signed by the server.
        }
    }
}