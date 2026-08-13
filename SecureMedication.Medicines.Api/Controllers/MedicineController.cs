using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO.Pipelines;
using System.Net;

//Need to use the namespace for the Models package in order to access the classes models 
using SecureMedication.Medicines.Api.Models; 

namespace SecureMedication.Medicines.Api.Controllers
{
    //This is the main endpoint which leads to all of the other endpoints.
    //To access all the other endpoints need to first add this endpoint
    [Route("medicine")]
    public class MedicineController : Controller
    {
        //To access this endpoint need to first add the prime endpoint: /medicine/home
        [Route("home")]
        public string home()
        {
            return "Api functional";
        }

        [Route("saveMedicine")]
        //Need to be for the actual endpoint: public List<Medicine> SaveMedicines(Medicine medicine)
        public string saveMedicines()
        {
            //var medicineList = new List<Medicine>();
            return "Endpoint to save medicines, WORK ON PROGRESS";

        }
    }
}
