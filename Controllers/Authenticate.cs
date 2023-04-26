using Microsoft.AspNetCore.Mvc;
using App.Context;
using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace App.Controllers;

  [ApiController]
  [Route("api/[controller]")]
  public class AuthorizationController : ControllerBase
  {
    private readonly ApplicationContext _applicationContext;
    public AuthorizationController(ApplicationContext applicationContext)
    {
      _applicationContext = applicationContext;
    }

    [Authorize]
    [HttpGet]
    [Route("api/check-auth")]
    public IActionResult CheckAuth()
    {
      // User is authenticated, return success response
      return Ok();
    }
  }

