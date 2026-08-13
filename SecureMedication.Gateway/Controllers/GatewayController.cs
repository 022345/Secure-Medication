using Microsoft.AspNetCore.Mvc;

namespace SecureMedication.Gateway.Controllers
{
    [Route("gateway")]
    public class GatewayController : Controller
    {
        [Route("home")]
        public string home()
        {
            return "You're in the Gateway home point! Congrats it worked!";
        }
    }
}
