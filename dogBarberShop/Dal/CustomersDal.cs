using DogBarberShopServer.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopServer.Dal
{
    public class CustomersDal : ICustomerDal
    {
        private DogBarberShopContext _context;

        public CustomersDal(DogBarberShopContext context)
        {
            _context = context;
        }

        public IEnumerable<Customer> GetAll()
        {
            return _context.Customers;
        }

        public async Task<Customer> GetById(int id)
        {
            return await _context.Customers.FindAsync(id);
        }

        public async Task<Customer> Put(Customer customerFromInput, int id)
        {
            Customer customer = await _context.Customers.FindAsync(id);
            customer.Firstname = customerFromInput.Firstname;
            customer.Username= customerFromInput.Username;
            customer.Password = customerFromInput.Password;
            /*customer.Orders =  _context.Orders.Select(x =>
            new
            {
                x.CustomerId,
                x.ArrivalDate,
                x.ArrivalHour,
                x.RequestDate
            }).Where(x => x.CustomerId == id);*/
            await _context.SaveChangesAsync();

            return customer;
        }

        public async Task<int> Create(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer.Id;
        }

        public async Task<Customer> Delete(int id)
        {
            Customer customer = await _context.Customers.FindAsync(id);

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        public async Task<Customer> FindCustomerAsync(LoginCustomer loginCustomer)
        {
            return await _context.Customers.FirstOrDefaultAsync(e => e.Username == loginCustomer.Username && e.Password == loginCustomer.Password);
        }
    }
}