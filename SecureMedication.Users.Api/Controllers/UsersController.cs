using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SecureMedication.Users.Api.Models;
using SecureMedication.Users.Api.Persistence;

namespace SecureMedication.Users.Api.Controllers
{
    [Route("users")]
    public class GatewayController : Controller
    {

        public readonly UsersDbContext _usersDbContext;

        public GatewayController(UsersDbContext usersDbContext)
        {
            _usersDbContext = usersDbContext;    
        }

        [Route("home")]
        public string home()
        {
            return "You're in the Gateway home point! Congrats it worked!";
        }

        [Route("seeUsers")]
        public async Task<List<User>> showUsers([FromBody] List<User> users)
        {
            _usersDbContext.User.ToListAsync();
            return users;
        }

        [Route("saveUsers")]
        public async Task<List<User>> saveUsers([FromBody] List<User> users)
        {
            _usersDbContext.User.ToListAsync();
            _usersDbContext.SaveChanges();
            return users;
        }
    }
}
