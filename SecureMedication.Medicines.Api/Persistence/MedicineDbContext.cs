using Microsoft.EntityFrameworkCore;
using SecureMedication.Medicines.Api.Models;

namespace SecureMedication.Medicines.Api.Persistence
{
    public class MedicineDbContext : DbContext
    {
        public MedicineDbContext(DbContextOptions<MedicineDbContext> options) : base(options)
        {
                
        }

        public DbSet<Medicine> Medicine { get; set; }
    }
}
