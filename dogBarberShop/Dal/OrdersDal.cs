using DogBarberShopServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopServer.Dal
{
    public class OrdersDal : IOrdersDal
    {
        private DogBarberShopContext _context;
        //private CustomersDal _customerDal;

        public OrdersDal(DogBarberShopContext context
            //, CustomersDal customersDal
            )
        {
            _context = context;
            //_customerDal = customersDal;
        }

        public async Task<Order> Create(Order order, int customerId)
        {
            Customer customer = await _context.Customers.FindAsync(customerId);

            Order newOrder = new Order()
            {
                ArrivalDate = order.ArrivalDate,
                RequestDate = order.RequestDate,
                ArrivalHour = order.ArrivalHour,
                CustomerId = customerId,
                Customer = customer
            };

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();
            return newOrder;
        }

        public async Task<Order> GetByOrderId(int id)
        {
            Order order = await _context.Orders.FindAsync(id);
            return order;
        }

        public IEnumerable<Order> GetOrdersByCustomerId(int customerId)
        {
            return _context.Orders.Where(x => x.CustomerId == customerId);
        }

        public async Task<Order> GetById(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public IQueryable<object> GetAllDistinctCustomers()
        {
            /*var customer = _context.Customers.Select(u => new 
            {
                u.Firstname,
                u.Username,
                u.Id
            }).ToArray();*/

            IQueryable<object> getDistinctCustomersQuery = (
    from order in _context.Orders
    from customer in _context.Customers
    where order.CustomerId == customer.Id
    orderby order.CustomerId
    select new
    {
        CustomerId = order.CustomerId,
        Firstname = customer.Firstname,
        Username = customer.Username
    }).Distinct();
            return getDistinctCustomersQuery;
        }

        /*public IEnumerable<Order> GetAll()
        {
            return _context.Orders;
        }*/

        public async Task<Order> Put(Order orderFromInput, int id)
        {
            Order order = await _context.Orders.FindAsync(id);
            order.ArrivalDate = orderFromInput.ArrivalDate;
            order.ArrivalHour = orderFromInput.ArrivalHour;
            order.RequestDate = orderFromInput.RequestDate;

            await _context.SaveChangesAsync();

            return order;
        }

        public async Task<Order> Delete(int id)
        {
            Order order = await _context.Orders.FindAsync(id);

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }
    }
}
