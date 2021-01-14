using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DogBarberShopServer.Models;
using DogBarberShopServer.Logic;
using Microsoft.AspNetCore.Authorization;

namespace DogBarberShopServer.Controllers
{
    [Authorize]
    [Route("orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private IOrdersLogic _ordersLogic;

        public OrdersController(IOrdersLogic ordersLogic)
        {
            _ordersLogic = ordersLogic;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("get")]
        public IActionResult Get()
        {
            return Ok("success");
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getAllDistinctCustomers")]
        public IActionResult GetAllDistinctCustomers()
        {
            try
            {
                return Ok(_ordersLogic.GetAllDistinctCustomers());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Data);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("create/{customerId}")]
        public async Task<IActionResult> PostOrder([FromBody] Order order, [FromRoute] int customerId)
        {
            try
            {
                Order newOrder = await _ordersLogic.Create(order, customerId);
                return Ok(newOrder);
            } 
            catch (Exception ex)
            {
                return BadRequest(ex.Data);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("getByOrderId/{orderId}")]
        public async Task<IActionResult> GetOrder([FromRoute] int orderId)
        {
            try
            {
                Order order = await _ordersLogic.GetByOrderId(orderId);

                if(order == null)
                {
                    return NotFound();
                }

                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("getOrdersByCustomerId/{customerId}")]
        public IActionResult GetOrdersByCustomerId([FromRoute] int customerId)
        {
            try
            {
                return Ok(_ordersLogic.GetOrdersByCustomerId(customerId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut]
        [Route("updateOrder/{orderId}")]
        public async Task<IActionResult> PutOrder([FromBody] Order orderFromInput, [FromRoute] int orderId)
        {
            try
            {
                Order order = await _ordersLogic.Put(orderFromInput, orderId);

                if (order == null)
                {
                    return NotFound();
                }

                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Data);
            }
        }


        [Authorize]
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] int id)
        {
            try
            {
                await _ordersLogic.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
