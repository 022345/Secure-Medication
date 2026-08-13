using Microsoft.AspNetCore.Mvc;

namespace SecureMedication.Users.Api.Controllers
{
    [Route("users")]
    public class GatewayController : Controller
    {
        [Route("home")]
        public string home()
        {
            return "You're in the Gateway home point! Congrats it worked!";
        }
    }
}
