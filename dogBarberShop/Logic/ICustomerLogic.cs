using DogBarberShopServer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DogBarberShopServer.Logic
{
    public interface ICustomerLogic
    {
        IEnumerable<Customer> GetAll();
        Task<Customer> GetById(int id);
        Task<Customer> Put(Customer customer, int id);
        Task<int> Create(Customer customer);
        LoginReturnModel Login(LoginCustomer loginCustomer);
        Task<Customer> Delete(int id);
        string loginErrorMessage(LoginReturnModel loginCustomer);
    }
}
