using Microsoft.AspNetCore.Mvc;
using App.Context;
using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using App.Utils;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace App.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthorizationController : ControllerBase
{
  private readonly ApplicationContext _applicationContext;
  private readonly IConfiguration _configuration;
  public AuthorizationController(ApplicationContext applicationContext, IConfiguration configuration)
  {
      _applicationContext = applicationContext;
      _configuration = configuration;
  }

  [Authorize]
  [HttpGet]
  public IActionResult CheckAuth()
  {
    return Ok();
  }
  
  [AllowAnonymous]
  [HttpPost]
  public async Task<IActionResult> AuthenticateUser([FromBody] User user)
  {
    if (_applicationContext == null || _applicationContext.UserList == null)
    {
      return NotFound();
    }

    User? userInLoginProcess = _applicationContext.UserList.FirstOrDefault(u => u.Login == user.Login);

    if (userInLoginProcess == null || !PasswordUtils.Authenticate(userInLoginProcess, user.Password))
    {
      return Unauthorized();
    }

    var claims = new[]
    {
                new Claim(ClaimTypes.NameIdentifier, userInLoginProcess.Id.ToString()),
                new Claim(ClaimTypes.Name, userInLoginProcess.Login)
            };
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AndrzejSecretKey"]));
    var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.UtcNow.AddDays(7),
        signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
    );

    return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
  }
}

