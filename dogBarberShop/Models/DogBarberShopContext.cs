using Microsoft.EntityFrameworkCore;

namespace DogBarberShopServer.Models
{
    public class DogBarberShopContext : DbContext
    {
        public DogBarberShopContext(DbContextOptions<DogBarberShopContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}