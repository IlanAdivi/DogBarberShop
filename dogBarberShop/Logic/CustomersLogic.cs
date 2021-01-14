using DogBarberShopServer.Dal;
using DogBarberShopServer.Models;
using System;
using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;

namespace DogBarberShopServer.Logic
{
    public class CustomersLogic : ICustomerLogic
    {
        private ICustomerDal _customersDal;
        private readonly AppSettings _appSettings;

        public CustomersLogic(ICustomerDal customersDal, IOptions<AppSettings> appSettings)
        {
            _customersDal = customersDal;
            _appSettings = appSettings.Value;
        }

        public IEnumerable<Customer> GetAll()
        {
            return _customersDal.GetAll();
        }

        public async Task<Customer> GetById(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID is not valid.");

            return await _customersDal.GetById(id);
        }

        public async Task<Customer> Put(Customer customerFromInput, int id)
        {
            if (id <= 0 || isCustomerModelEmpty(customerFromInput))
                throw new ArgumentException("Arguments are not valid.");
            customerFromInput.Password = passwordToHashPass(customerFromInput.Password);
            Customer customer = await _customersDal.Put(customerFromInput, id);

            return customer;
        }

        public async Task<int> Create(Customer customer)
        {
            if (isCustomerModelEmpty(customer))
                throw new ArgumentException("Arguments are not valid.");

            if(!isCustomerValid(customer))
            {
                string passwordError = errorPasswordMessage(customer.Password);
                string usernameError = errorUsernameMessage(customer.Username);
                string firstnameError = errorFirstnameMessage(customer.Firstname);

                throw new ArgumentException { Data = { {
                            "errors",
                            new Customer() {
                            Password = passwordError ,
                            Username = usernameError ,
                            Firstname = firstnameError
                            }
                        } } };
            }

            customer.Password = passwordToHashPass(customer.Password);
            return await _customersDal.Create(customer);
        }

        public LoginReturnModel Login(LoginCustomer loginCustomer)
        {

            if (isLoginModelEmpty(loginCustomer))
                throw new ArgumentException("Arguments are not valid.");

            if (!isLoginCustomerValid(loginCustomer))
            {
                string passwordError = errorPasswordMessage(loginCustomer.Password);
                string usernameError = errorUsernameMessage(loginCustomer.Username);
                //throw new ArgumentException() { Data = { { "Password", passwordError }, { "Username", usernameError } } };
                throw new ArgumentException
                {
                    Data = { {
                            "errors",
                            new LoginCustomer() {
                            Password = passwordError ,
                            Username = usernameError 
                            }
                        } }
                };
            }

            loginCustomer.Password = passwordToHashPass(loginCustomer.Password);

            Task<Customer> customerTask = _customersDal.FindCustomerAsync(loginCustomer);
            Customer customer = customerTask.Result;
            if (isEmptyCustomer(customer)) 
            {
                return null;
            } else
            {
                string token = generateToken(customer);
                LoginReturnModel customerWithGeneratedToken = new LoginReturnModel
                {
                    Customer = customer,
                    Token = token
                };
                return customerWithGeneratedToken;
            }
        }

        public async Task<Customer> Delete(int id)
        {
            if (id <= 0)
                throw new ArgumentException("Arguments are not valid.");

            return await _customersDal.Delete(id);
        }

        private bool isLoginModelEmpty(LoginCustomer loginCustomer)
        {
            bool isEmpty = true;
            if (loginCustomer != null 
                && !string.IsNullOrEmpty(loginCustomer.Username) 
                && !string.IsNullOrEmpty(loginCustomer.Password)
                )
            {
                isEmpty = false;
            }
            return isEmpty;
        }

        private bool isCustomerModelEmpty(Customer customer)
        {
            bool isEmpty = true;

            if (customer != null
                && !string.IsNullOrEmpty(customer.Firstname)
                && !string.IsNullOrEmpty(customer.Password)
                && !string.IsNullOrEmpty(customer.Username))
            {
                isEmpty = false;
            }
            return isEmpty;
        }

        private bool isPasswordValid(string password)
        {
            bool isValid = false;

            if (password.Length >= 2)
            {
                isValid = true;
            }

            return isValid;
        }

        private bool isUsernameValid(string username)
        {
            bool isValid = false;

            if (username.Length >= 2)
            {
                isValid = true;
            }

            return isValid;
        }

        private bool isFirstnameValid(string firstname)
        {
            bool isValid = false;

            if (firstname.Length >= 2)
            {
                isValid = true;
            }

            return isValid;
        }

        private bool isCustomerValid(Customer customer)
        {
            bool isValid = false;

            if(isPasswordValid(customer.Password)
                && isUsernameValid(customer.Username)
                && isFirstnameValid(customer.Firstname))
            {
                isValid = true;
            }

            return isValid;
        }

        private bool isLoginCustomerValid(LoginCustomer loginCustomer)
        {
            bool isValid = false;

            if (isPasswordValid(loginCustomer.Password)
                && isUsernameValid(loginCustomer.Username))
            {
                isValid = true;
            }

            return isValid;
        }

        private bool isEmptyCustomer(Customer customer)
        {
            bool isEmpty = true;

            if(customer != null)
            {
                isEmpty = false;
            }

            return isEmpty;
        }

        private string errorPasswordMessage(string password)
        {
            string message = "";

            if(!isPasswordValid(password))
            {
                message = "Password must be with at least 2 characters";
            }

            return message;
        }

        private string errorUsernameMessage(string username)
        {
            string message = "";

            if (!isUsernameValid(username))
            {
                message = "Username must be with at least 2 characters";
            }

            return message;
        }

        private string errorFirstnameMessage(string firstname)
        {
            string message = "";

            if (!isFirstnameValid(firstname))
            {
                message = "Firstname must be with at least 2 characters";
            }

            return message;
        }

        public string loginErrorMessage(LoginReturnModel loginCustomer)
        {
            string message = "";

            if (loginCustomer == null)
            {
                message = "Username or password is incorrect";
            }

            return message;
        }

        private string passwordToHashPass(string password)
        {
            byte[] data = System.Text.Encoding.ASCII.GetBytes(password);
            data = new System.Security.Cryptography.SHA256Managed().ComputeHash(data);
            return System.Text.Encoding.ASCII.GetString(data);
        }

        private string generateToken(Customer customer)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                     new Claim(ClaimTypes.Name, customer.Id.ToString()),
                    new Claim(ClaimTypes.UserData, customer.Username)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string generateToken = tokenHandler.WriteToken(token);

            return generateToken;
        }
    }
}