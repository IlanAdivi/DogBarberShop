namespace DogBarberShopServer.Models
{
    public class LoginReturnModel
    {
        public string Token { get; set; }
        public Customer Customer { get; set; }
    }
}
