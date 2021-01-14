using DogBarberShopServer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DogBarberShopServer.Dal
{
    public interface ICustomerDal
    {
        IEnumerable<Customer> GetAll();
        Task<Customer> GetById(int id);
        Task<Customer> Put(Customer customer, int id);
        Task<int> Create(Customer customer);
        Task<Customer> Delete(int id);
        Task<Customer> FindCustomerAsync(LoginCustomer loginCustomer);

    }
}
