using Microsoft.EntityFrameworkCore;
using SecureMedication.Users.Api.Persistence;
using System;

namespace SecureMedication.Users.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration
                .GetConnectionString("UsersConnectionString");

            builder.Services.AddDbContext<UsersDbContext>(options => options
            .UseNpgsql(connectionString));
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();


            var scope = app.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<UsersDbContext>();

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
