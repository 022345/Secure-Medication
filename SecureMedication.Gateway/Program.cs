
namespace SecureMedication.Gateway
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            /*The configuration for YARP is defined in the appsettings.json file,
              the ReverseProxy is the section pointed in the Dependency Injection 
              where the YARP config is made*/

            //Dependency Injection of YARP configuration
            builder.Services.AddReverseProxy()
                .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

            // Add services to the container.
            //builder.Services.AddControllers();

            builder.Services.AddOpenApi();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            //app.MapControllers();

            //Method that allows to use the YARP configuration middleware
            app.MapReverseProxy();

            app.Run();
        }
    }
}
