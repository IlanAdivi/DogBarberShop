using DogBarberShopServer.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopServer.Logic
{
    public interface IOrdersLogic
    {
        Task<Order> Create(Order order, int customerId);
        Task<Order> Delete(int id);
        IQueryable<object> GetAllDistinctCustomers();
        Task<Order> GetByOrderId(int id);
        IEnumerable<Order> GetOrdersByCustomerId(int customerId);
        Task<Order> Put(Order orderFromInput, int id);
    }
}