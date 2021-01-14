using System.ComponentModel.DataAnnotations;

namespace DogBarberShopServer.Models
{
    public class LoginCustomer
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}