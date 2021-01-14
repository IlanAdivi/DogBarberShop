using DogBarberShopServer.Dal;
using DogBarberShopServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopServer.Logic
{
    public class OrdersLogic : IOrdersLogic
    {
        private IOrdersDal _ordersDal;

        public OrdersLogic(IOrdersDal ordersDal)
        {
            _ordersDal = ordersDal;
        }

        public async Task<Order> Create(Order order, int customerId)
        {
            if(customerId <= 0 || isOrderValid(order))
                throw new ArgumentException("Arguments are not valid.");

            convertDateToLocalDate(order);

            if(!validArrivalAndRequestDate(order.ArrivalDate, order.RequestDate)) 
            {
                string dateError = errorDateMessage(order.ArrivalDate, order.RequestDate);

                throw new ArgumentException
                {
                    Data = { {
                            "errors",
                            new {
                            date = dateError ,
                            }
                        } }
                };
            }

            order.ArrivalHour = convertHourToLocalHour(order.ArrivalHour);
            return await _ordersDal.Create(order, customerId);
        }

        public async Task<Order> GetByOrderId(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID is not valid.");

            return await _ordersDal.GetByOrderId(id);
        }

        public IQueryable<object> GetAllDistinctCustomers()
        {
            return _ordersDal.GetAllDistinctCustomers();
        }

        public IEnumerable<Order> GetOrdersByCustomerId(int customerId)
        {
            return _ordersDal.GetOrdersByCustomerId(customerId);
        }

        public async Task<Order> Put(Order orderFromInput, int id)
        {
            if (id <= 0 || isOrderValid(orderFromInput))
                throw new ArgumentException("Arguments are not valid.");

            convertDateToLocalDate(orderFromInput);

            if (!validArrivalAndRequestDate(orderFromInput.ArrivalDate, orderFromInput.RequestDate))
            {
                string dateError = errorDateMessage(orderFromInput.ArrivalDate, orderFromInput.RequestDate);

                throw new ArgumentException
                {
                    Data = { {
                            "errors",
                            new {
                            date = dateError ,
                            }
                        } }
                };
            }
            orderFromInput.ArrivalHour = convertHourToLocalHour(orderFromInput.ArrivalHour);
            Order order = await _ordersDal.Put(orderFromInput, id);
            return order;
        }

        public async Task<Order> Delete(int id)
        {
            if (id <= 0)
                throw new ArgumentException("Argument are not valid.");

            return await _ordersDal.Delete(id);
        }

        private Order convertDateToLocalDate(Order order)
        {
            order.ArrivalDate = order.ArrivalDate.ToLocalTime();
            order.RequestDate = DateTime.Now.ToLocalTime();
            return order;
        }

        private string convertHourToLocalHour(string arrivalHour)
        {
            DateTime convertArrivalHourToDateTime = Convert.ToDateTime(arrivalHour).ToLocalTime();
            string convertArrivalHourToString = Convert.ToString(convertArrivalHourToDateTime);
            string arrivalHourAfterRemoveDatePart = convertArrivalHourToString.Remove(0, 11);

            if(arrivalHourAfterRemoveDatePart.Length == 7)
            {
                ////Case of Am with 7 caracters
                arrivalHour = arrivalHourAfterRemoveDatePart.Remove(4, 3);
            } 
            else
            {
                arrivalHour = arrivalHourAfterRemoveDatePart.Remove(5, 3);
            }
            
            return arrivalHour;
        }

        private bool validArrivalAndRequestDate(DateTime arrivalDate, DateTime requestDate)
        {
            bool isValidDate = false;
            int result = DateTime.Compare(arrivalDate, requestDate);

            if (result <= 0)
                isValidDate = false;
            else
                isValidDate = true;

            return isValidDate;
        }

        private bool isValidDate(DateTime date)
        {
            bool isValid = false;

            if (date != DateTime.MinValue)
            {
                isValid = true;
            }

            return isValid;
        }

        private bool isEmptyOrder(Order order)
        {
            bool isEmpty = true;

            if (order != null)
            {
                isEmpty = false;
            }

            return isEmpty;
        }

        private bool isValidArrivalHour(string arrivalHour)
        {
            bool isValid = false;

            if(arrivalHour != null)
            {
                isValid = true;
            }  
            else 
            {
                isValid = true;
                throw new ArgumentException
                {
                    Data = { {
                            "errors",
                            new {
                            arrivalHour = "Invalid Arrival Hour" ,
                            }
                        } }
                };
            }

            return isValid;
        }

        private bool isOrderValid(Order order)
        {
            bool isEmpty = true;
            if (!isEmptyOrder(order)
                && isValidDate(order.ArrivalDate)
                && isValidArrivalHour(order.ArrivalHour)
                )
            {
                isEmpty = false;
            }
            return isEmpty;
        }

        private string errorDateMessage(DateTime arrivalDate, DateTime requestDate)
        {
            string message = "";
            if (!validArrivalAndRequestDate(arrivalDate, requestDate))
            {
                message = "Arrival Date can't be before Request Date";
            }

            return message;
        }
    }
}
