
using Microsoft.EntityFrameworkCore;
using SecureMedication.Medicines.Api.Models;
using SecureMedication.Medicines.Api.Persistence;
using System;

namespace SecureMedication.Medicines.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration
                .GetConnectionString("SupabaseConnectionString");

            builder.Services.AddDbContext<MedicineDbContext>(options =>
                options.UseNpgsql(connectionString));

            // Add services to the container.
            builder.Services.AddControllers();

            builder.Services.AddOpenApi();

            var app = builder.Build();

            var scope = app.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<MedicineDbContext>();

            //var medicineList = db.Medicine.ToList();

            /*foreach (Medicine medicine in medicineList)
            {
                Console.Write("Medicines");
                Console.Write($"\nID{medicine.Id} \nName:{medicine.Name} \nDescription:{medicine.Description} \nBrand:{medicine.Brand} \nDailyDosage:{medicine.DailyDosage} \nMiligrams:{medicine.Milligrams} \nQuantity{medicine.Quantity} \nPresentation{medicine.Presentation} \nServings:{medicine.ServingsPerContainer}");
            }*/

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
