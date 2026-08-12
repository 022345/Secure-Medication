using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SecureMedication.Medicines.Api.Controllers
{
    [Route("medicine")]
    public class MedicineController : Controller
    {
        [Route("home")]
        public string home()
        {
            return "Api functional";
        }
    }
}
