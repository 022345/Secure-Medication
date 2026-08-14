using Microsoft.EntityFrameworkCore;
using SecureMedication.Users.Api.Models;

namespace SecureMedication.Users.Api.Persistence
{
    public class UsersDbContext : DbContext
    {
        public UsersDbContext(DbContextOptions<UsersDbContext> options): base(options) 
        {
                
        }

        public DbSet<User> User { get; set; }
    }
}
