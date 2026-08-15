
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

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

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false; // O true si usas HTTPS estricto en producción
                options.Audience = builder.Configuration["Authentication:Audience"];
                options.MetadataAddress = builder.Configuration["Authentication:MetadataAddress"];

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = builder.Configuration["Authentication:ValidIssuer"]
                };
            });

            builder.Services.AddAuthorization();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();
    
            app.UseAuthentication();

            app.UseAuthorization();


            //app.MapControllers();

            //Method that allows to use the YARP configuration middleware
            app.MapReverseProxy();

            app.UseCors("AllowAll");

            app.Run();
        }
    }
}
