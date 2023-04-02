using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MiniE_TicaretAPI.Application.Abstractions.Token;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Infrastructure.Services.Token
{
    public class TokenHandler : ITokenHandler
    {
        readonly IConfiguration _configuration;

        public TokenHandler(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Domain.DTOS.Token CreateAccess(int minute,string userId)
        {
            Domain.DTOS.Token token = new Domain.DTOS.Token();
            //security key için simertrik alıyoruz
            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(_configuration["Token:SecurityKey"]));
            //şifrelenmiş kimlik oluşturuyoruz
            SigningCredentials signingCredentials = new(securityKey, SecurityAlgorithms.HmacSha256);
            //oluşturalacak token ayarlarını veriyoruz.
            token.Expiration = DateTime.Now.AddMinutes(minute);
            JwtSecurityToken securityToken = new(
                audience: _configuration["Token:Audience"],
                issuer: _configuration["Token:Issuer"],
                expires: token.Expiration,
                notBefore: DateTime.Now,
                signingCredentials: signingCredentials,
                

                claims: new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub,userId)
                }
                

                );
            //token oluşturucu sınıfından örnek alıyoruz.
            JwtSecurityTokenHandler tokenHandler = new();
            token.AccesssToken = tokenHandler.WriteToken(securityToken);
            return token;
        }
    }
}
