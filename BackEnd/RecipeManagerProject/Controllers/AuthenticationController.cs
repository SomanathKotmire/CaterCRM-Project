using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using RecipeManagerProject.Context;
using RecipeManagerProject.DTOs;
using RecipeManagerProject.Models;
using System.Collections;

namespace RecipeManagerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        ProjectDBContext _context;
        

        public AuthenticationController(ProjectDBContext context)
        {
            _context = context;
        }

        [HttpPost("login")]

        public IActionResult Login(Login login)
        {
            List<User> users  = _context.Users.Where(user => user.Email.Equals(login.Email) && user.Password.Equals(login.Password)).ToList();
            if (users.Count > 0)
            {
                LoginStatusDto loginStatusDto = new LoginStatusDto()
                {
                    Status = "Success",
                          User = users[0]
                };
                return Ok(loginStatusDto);
            }
            else
            {
                LoginStatusDto loginStatusDto = new LoginStatusDto()
                {
                     Status = "Failed",
                          User = null
                };
                return Ok(loginStatusDto);
            }
            
        }
    }
}
