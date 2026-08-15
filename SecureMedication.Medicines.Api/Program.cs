
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

            try
            {
                
                var med1 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000001",
                    Name = "Paracetamol",
                    Description = "Alivio del dolor leve a moderado y reducción de fiebre.",
                    Brand = "Bayer",
                    DailyDosage = 3,
                    Milligrams = 500,
                    Quantity = 100,
                    Presentation = "Tabletas recubiertas",
                    ServingsPerContainer = 100
                };

                var med2 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000002",
                    Name = "Ibuprofeno",
                    Description = "Antiinflamatorio no esteroideo para el tratamiento del dolor y la inflamación.",
                    Brand = "Genven",
                    DailyDosage = 3,
                    Milligrams = 400,
                    Quantity = 50,
                    Presentation = "Cápsulas blandas",
                    ServingsPerContainer = 50
                };

                var med3 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000003",
                    Name = "Amoxicilina",
                    Description = "Antibiótico betalactámico indicado para infecciones bacterianas.",
                    Brand = "Glaxo",
                    DailyDosage = 2,
                    Milligrams = 500,
                    Quantity = 30,
                    Presentation = "Cápsulas",
                    ServingsPerContainer = 30
                };

                var med4 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000004",
                    Name = "Omeprazol",
                    Description = "Inhibidor de la bomba de protones para úlceras y reflujo gástrico.",
                    Brand = "Mk",
                    DailyDosage = 1,
                    Milligrams = 20,
                    Quantity = 28,
                    Presentation = "Cápsulas de liberación prolongada",
                    ServingsPerContainer = 28
                };

                var med5 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000005",
                    Name = "Loratadina",
                    Description = "Antihistamínico no sedante para el tratamiento de alergias.",
                    Brand = "Schering",
                    DailyDosage = 1,
                    Milligrams = 10,
                    Quantity = 20,
                    Presentation = "Tabletas",
                    ServingsPerContainer = 20
                };

                var med6 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000006",
                    Name = "Losartán Potásico",
                    Description = "Antagonista de los receptores de angiotensina II para la hipertensión.",
                    Brand = "Sandoz",
                    DailyDosage = 1,
                    Milligrams = 50,
                    Quantity = 30,
                    Presentation = "Tabletas recubiertas",
                    ServingsPerContainer = 30
                };

                var med7 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000007",
                    Name = "Metformina Clorhidrato",
                    Description = "Hipoglucemiante oral para el control de la diabetes tipo 2.",
                    Brand = "Merck",
                    DailyDosage = 2,
                    Milligrams = 850,
                    Quantity = 60,
                    Presentation = "Tabletas",
                    ServingsPerContainer = 60
                };

                var med8 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000008",
                    Name = "Atorvastatina",
                    Description = "Estatina utilizada para disminuir los niveles de colesterol en sangre.",
                    Brand = "Pfizer",
                    DailyDosage = 1,
                    Milligrams = 20,
                    Quantity = 30,
                    Presentation = "Comprimidos",
                    ServingsPerContainer = 30
                };

                var med9 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000009",
                    Name = "Salbutamol Inhalador",
                    Description = "Broncodilatador para el alivio del asma y broncoespasmo.",
                    Brand = "GSK",
                    DailyDosage = 4,
                    Milligrams = 100,
                    Quantity = 1,
                    Presentation = "Aerosol inhalador",
                    ServingsPerContainer = 200
                };

                var med10 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000010",
                    Name = "Ibuprofeno Suspensión",
                    Description = "Alivio de la fiebre y el dolor en niños.",
                    Brand = "Advil",
                    DailyDosage = 3,
                    Milligrams = 100,
                    Quantity = 1,
                    Presentation = "Jarabe suspensión oral",
                    ServingsPerContainer = 24
                };

                var med11 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000011",
                    Name = "Diclofenaco Sódico",
                    Description = "Antinflamatorio y analgésico para dolores musculares y articulares.",
                    Brand = "Novartis",
                    DailyDosage = 2,
                    Milligrams = 50,
                    Quantity = 20,
                    Presentation = "Tabletas entéricas",
                    ServingsPerContainer = 20
                };

                var med12 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000012",
                    Name = "Cetirizina Clorhidrato",
                    Description = "Antihistamínico para el alivio de síntomas de rinitis alérgica.",
                    Brand = "Pfizer",
                    DailyDosage = 1,
                    Milligrams = 10,
                    Quantity = 30,
                    Presentation = "Comprimidos recubiertos",
                    ServingsPerContainer = 30
                };

                var med13 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000013",
                    Name = "Azitromicina",
                    Description = "Antibiótico macrólido para infecciones de las vías respiratorias.",
                    Brand = "Pfizer",
                    DailyDosage = 1,
                    Milligrams = 500,
                    Quantity = 5,
                    Presentation = "Comprimidos",
                    ServingsPerContainer = 5
                };

                var med14 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000014",
                    Name = "Cefalexina",
                    Description = "Antibiótico cefalosporínico para infecciones de piel y tracto urinario.",
                    Brand = "La Sante",
                    DailyDosage = 4,
                    Milligrams = 500,
                    Quantity = 40,
                    Presentation = "Cápsulas",
                    ServingsPerContainer = 40
                };

                var med15 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000015",
                    Name = "Enalapril Maleato",
                    Description = "Inhibidor de la ECA utilizado en el tratamiento de la hipertensión arterial.",
                    Brand = "3M",
                    DailyDosage = 1,
                    Milligrams = 10,
                    Quantity = 30,
                    Presentation = "Tabletas",
                    ServingsPerContainer = 30
                };

                var med16 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000016",
                    Name = "Furosemida",
                    Description = "Diurético de asa utilizado para la retención de líquidos y la hipertensión.",
                    Brand = "Sanofi",
                    DailyDosage = 1,
                    Milligrams = 40,
                    Quantity = 30,
                    Presentation = "Comprimidos",
                    ServingsPerContainer = 30
                };

                var med17 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000017",
                    Name = "Naproxeno Sódico",
                    Description = "Analgésico y antiinflamatorio para dolores agudos y crónicos.",
                    Brand = "Bayer",
                    DailyDosage = 2,
                    Milligrams = 550,
                    Quantity = 20,
                    Presentation = "Tabletas",
                    ServingsPerContainer = 20
                };

                var med18 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000018",
                    Name = "Ranitidina",
                    Description = "Reductor de la producción de ácido estomacal para la acidez gástrica.",
                    Brand = "GSK",
                    DailyDosage = 2,
                    Milligrams = 150,
                    Quantity = 20,
                    Presentation = "Comprimidos",
                    ServingsPerContainer = 20
                };

                var med19 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000019",
                    Name = "Simvastatina",
                    Description = "Medicamento para reducir el colesterol total y LDL en la sangre.",
                    Brand = "Merck",
                    DailyDosage = 1,
                    Milligrams = 20,
                    Quantity = 30,
                    Presentation = "Comprimidos",
                    ServingsPerContainer = 30
                };

                var med20 = new Medicine
                {
                    Id = "1a2b3c4d-0001-4100-8100-000000000020",
                    Name = "Prednisona",
                    Description = "Corticoesteroide con propiedades antiinflamatorias e inmunosupresoras.",
                    Brand = "Pfizer",
                    DailyDosage = 1,
                    Milligrams = 20,
                    Quantity = 10,
                    Presentation = "Tabletas",
                    ServingsPerContainer = 10
                };

                db.Medicine.AddRange(med1, med2, med3, med4, med5, med6, med7, med8, med9, med10, med11, med12, med13, med14, med15, med16, med17, med18, med19, med20);
            } catch (Exception ex) 
            {
                Console.WriteLine(ex.ToString());
            }

            var medicineList = db.Medicine.ToList();

            foreach (Medicine medicine in medicineList)
            {
                Console.Write("Medicines");
                Console.Write($"\nID{medicine.Id} \nName:{medicine.Name} \nDescription:{medicine.Description} \nBrand:{medicine.Brand} \nDailyDosage:{medicine.DailyDosage} \nMiligrams:{medicine.Milligrams} \nQuantity{medicine.Quantity} \nPresentation{medicine.Presentation} \nServings:{medicine.ServingsPerContainer}");
            }

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
