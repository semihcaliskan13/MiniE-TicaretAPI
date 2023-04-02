using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MiniE_TicaretAPI.Domain.Entities.Identity;
using MiniE_TicaretAPI.Domain.ViewModel;
using Newtonsoft.Json.Linq;
using System.Net;
using Microsoft.AspNetCore.Identity;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

using MiniE_TicaretAPI.Domain.DTOS;
using MiniE_TicaretAPI.Application.Abstractions.Token;
using Azure;

namespace MiniE_TicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly UserManager<MiniE_TicaretAPI.Domain.Entities.Identity.AppUser> _userManager;
        readonly SignInManager<Domain.Entities.Identity.AppUser> _signInManager;
        readonly ITokenHandler _tokenHandler;

        public UsersController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenHandler tokenHandler)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenHandler = tokenHandler;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateVM userCreateVM)
        {
            List<string > Error = new List<string>();   
            IdentityResult result = await _userManager.CreateAsync(new()
            {
                UserName = userCreateVM.UserName,
                Name = userCreateVM.Name,
                Surname = userCreateVM.Surname,
                Email = userCreateVM.Email,
                
                
            }, userCreateVM.Password);

            
            if (result.Succeeded)
            {

                return Ok("Kullanıcı başarıyla oluşturulmuştur.");
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    Error.Add($"{error.Code} - {error.Description}\n");
                }
                return Ok(Error);

            }           
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] UserLoginVM userLoginVM )
        {
            Domain.Entities.Identity.AppUser user = await _userManager.FindByNameAsync(userLoginVM.UsernameOrEmail);
            if (user == null)
                user = await _userManager.FindByEmailAsync(userLoginVM.UsernameOrEmail);

            if (user == null)
            {
                throw new Exception();
            }
            SignInResult signInResult = await _signInManager.CheckPasswordSignInAsync(user, userLoginVM.Password, false);
            UserResponseVM UserInfo = new UserResponseVM { Name = user.Name,  UserEmail = user.Email, SurName = user.Surname, Id = user.Id, UserName = user.UserName };
            if (signInResult.Succeeded)
            {
                Token token = _tokenHandler.CreateAccess(20, user.Id.ToString());
                UserInfo.Token = token;


                Response.Cookies.Append(
                   "access_token",
            token.AccesssToken,
           new CookieOptions
           {
               HttpOnly = true,
               Expires = DateTime.UtcNow.AddDays(7),
               IsEssential = true,
               SameSite = SameSiteMode.None,
               Secure = true,


           });
                


                return Ok(UserInfo);
            }
            else
            {
                return Ok("Giriş başarılı değil!");
            }
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> SignOut()
        {

            Response.Cookies.Append(
                  "access_token",
          "",
          new CookieOptions
          {
              HttpOnly = true,
              Expires = DateTime.UtcNow.AddDays(-1),
              IsEssential = true,
              SameSite = SameSiteMode.None,
              Secure = true,


          });
            return Ok();
        }
    }
}
