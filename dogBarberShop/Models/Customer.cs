using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DogBarberShopServer.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        [Required]
        public string Username { get; set; }

        [Column(TypeName = "nvarchar(256)")]
        [Required]
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        [Required]
        public string Firstname { get; set; }

        public ICollection<Order> Orders { get; set; }
        }
    }