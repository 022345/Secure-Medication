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
                .GetConnectionString("UsersDbConnectionString");

            builder.Services.AddDbContext<UsersDbContext>(options => options
            .UseNpgsql(connectionString, npgsql => npgsql.CommandTimeout(300)));
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

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
