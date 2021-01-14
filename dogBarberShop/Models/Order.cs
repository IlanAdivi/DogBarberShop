using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DogBarberShopServer.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "Date")]
        [Required]
        public DateTime ArrivalDate { get; set; }

        [Column(TypeName = "Date")]
        [Required]
        public DateTime RequestDate { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        [Required]
        public string ArrivalHour { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }
    }
}
