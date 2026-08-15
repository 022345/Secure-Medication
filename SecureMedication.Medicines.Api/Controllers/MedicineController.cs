using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO.Pipelines;
using System.Net;
using SecureMedication.Medicines.Api.Persistence;

//Need to use the namespace for the Models package in order to access the classes models 
using SecureMedication.Medicines.Api.Models; 

namespace SecureMedication.Medicines.Api.Controllers
{
    //This is the main endpoint which leads to all of the other endpoints.
    //To access all the other endpoints need to first add this endpoint
    [Route("medicine")]
    public class MedicineController : Controller
    {
        private readonly MedicineDbContext _context;
        public MedicineController(MedicineDbContext context) 
        {
            _context = context;
        }
        //To access this endpoint need to first add the prime endpoint: /medicine/home
        [Route("home")]
        public string home()
        {
            return "Api functional";
        }

        [Route("saveMedicine")]
        //Need to be for the actual endpoint: public List<Medicine> SaveMedicines(Medicine medicine)
        public async Task <List<Medicine>> saveMedicines(List<Medicine> medicine)
        {
            _context.Medicine.AddRange(medicine);
            await _context.SaveChangesAsync();
            return medicine;
        }
    }
}
