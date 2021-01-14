using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DogBarberShopServer.Models;
using DogBarberShopServer.Logic;
using Microsoft.AspNetCore.Authorization;

namespace DogBarberShopServer.Controllers
{
    [Authorize]
    [Route("customers")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private ICustomerLogic _customersLogic;

        public CustomersController(ICustomerLogic customersLogic)
        {
            _customersLogic = customersLogic;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> PostCustomer([FromBody] Customer customer)
        {
            try
            {
                int created_id = await _customersLogic.Create(customer);
                return StatusCode(201, new { created_id });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Data);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginCustomer loginCustomer)
        {
            try
            {
                LoginReturnModel customer = _customersLogic.Login(loginCustomer);

                if (customer == null)
                    return Unauthorized(new { message = _customersLogic.loginErrorMessage(customer) });

                return Ok(customer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Data);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("logout")]
        public IActionResult Logout()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Authorize]
        [AllowAnonymous]
        [HttpGet]
        [Route("getall")]
        public IActionResult GetCustomers()
        {
            try
            {
                return Ok(_customersLogic.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("get/{id}")]
        public async Task<IActionResult> GetCustomer([FromRoute] int id)
        {
            try
            {
                Customer customer = await _customersLogic.GetById(id);

                // only allow admins to access other user records
                /*var currentUserId = int.Parse(User.Identity.Name);
                if (id != currentUserId && !User.IsInRole(Role.Admin))
                    return Forbid();*/

                if (customer == null)
                {
                    return NotFound();
                }

                return Ok(customer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> PutCustomer([FromBody] Customer customerFromInput, [FromRoute] int id)
        {
            try
            {
                Customer customer = await _customersLogic.Put(customerFromInput, id);
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Authorize]
        [AllowAnonymous]
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id)
        {
            try
            {
                await _customersLogic.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}