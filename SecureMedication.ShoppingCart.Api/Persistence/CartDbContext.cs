using Microsoft.EntityFrameworkCore;
using SecureMedication.ShoppingCart.Api.Models;

namespace SecureMedication.ShoppingCart.Api.Persistence
{
    public class CartDbContext : DbContext
    {
        public CartDbContext(DbContextOptions<CartDbContext> options) : base(options)
        {

        }

        public DbSet<Cart> ShoppingCart { get; set; }
    }
}
