using Microsoft.AspNetCore.Mvc;
using App.Context;
using App.Models;
using App.Utils;

namespace App.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationContext _applicationContext;
        public UserController(ApplicationContext paintingContext)
        {
            _applicationContext = paintingContext;
        }

        [HttpPost]
        public async Task<ActionResult<bool>> AddUser([FromBody] User user)
        {
            if(_applicationContext == null || _applicationContext.UserList == null)
            {
                return NotFound();
            }

            byte[] passwordSalt = PasswordUtils.GeneratePasswordSalt();
            byte[] passwordHash = PasswordUtils.ComputePasswordHash(user.Password, passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Password = string.Empty;
            user.Registered = DateTimeOffset.Now;
            user.Role = "user";

            _applicationContext.UserList.Add(user);
            await _applicationContext.SaveChangesAsync();

            return true;
        }

    }

