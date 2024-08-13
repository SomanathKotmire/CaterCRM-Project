using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RecipeManagerProject.Context;
using RecipeManagerProject.DTOs;
using RecipeManagerProject.Models;
using System.Data;

namespace RecipeManagerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ProjectDBContext _context;
        IConfiguration configuration;

        public OrdersController(ProjectDBContext context, IConfiguration configuration)
        {
            _context = context;
            this.configuration = configuration;
        }

        [HttpPost("calculateAmount/{quantity}/{recipeId}")]
        public OrderRecipeDTO calculateAmount(int quantity, int recipeId)
        {
            Recipy recipy = _context.Recipies.Find(recipeId);
            List<RecipeIngredient> recipeIngredients = _context.RecipeIngredients.Where(ri => ri.RecipeId == recipeId).ToList();

            List<OrderRecipeIngredient> orderRecipeIngredients = new List<OrderRecipeIngredient>();

            double recipeTotal = 0;
            foreach (var recipeIngredient in recipeIngredients)
            {
                Ingredient ingredient = _context.Ingredients.Find(recipeIngredient.IngredientId);
                double rate = (double)ingredient.Rate;
                double ingredientTotalPrice = (double)(rate * recipeIngredient.Quantity);
                recipeTotal += ingredientTotalPrice;

                double singlePersonQuantity = (double)(recipeIngredient.Quantity / recipy.NoOfPerson);

                OrderRecipeIngredient orderRecipeIngredient = new OrderRecipeIngredient()
                {
                    Id = 0,
                    OrderRecipeId = 0,
                    IngredientId = ingredient.Id,
                    Quantity = singlePersonQuantity * quantity,
                    Rate = ingredient.Rate
                };
                orderRecipeIngredients.Add(orderRecipeIngredient);

            }
            double singlePersonPrice = (double)(recipeTotal / recipy.NoOfPerson);
            double totalPrice = singlePersonPrice * quantity;

            OrderRecipeDTO orderRecipeDTO = new OrderRecipeDTO()
            {
                Amount = totalPrice,
                orderRecipeIngredients = orderRecipeIngredients
            };

            return orderRecipeDTO;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderDTO orderDTO)
        {
            Order order = new Order()
            {
                Id = 0,
                Odate = orderDTO.Odate,
                Edate = orderDTO.Edate,
                EventTime = orderDTO.EventTime,
                Occasion = orderDTO.Occasion,
                NoOfPerson = orderDTO.NoOfPerson,
                Name = orderDTO.Name,
                Address = orderDTO.Address,
                Email = orderDTO.Email,
                MobileNo = orderDTO.MobileNo,
                Amount = orderDTO.Amount,
                BillAmount = orderDTO.BillAmount,
                UserId = orderDTO.UserId,
                Status = orderDTO.Status

            };
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            foreach (var orderRecipeDTO in orderDTO.OrderRecipies)
            {
                OrderRecipy orderRecipy = new OrderRecipy()
                {
                    OrderId = order.Id,
                    RecipeId = orderRecipeDTO.RecipeId,
                    Amount = orderRecipeDTO.Amount,
                    BillAmount = orderRecipeDTO.BillAmount
                };
                _context.OrderRecipies.Add(orderRecipy);
                await _context.SaveChangesAsync();
                foreach (var orderRecipeIngredientDTO in orderRecipeDTO.OrderRecipeIngredients)
                {
                    OrderRecipeIngredient orderRecipeIngredient = new OrderRecipeIngredient()
                    {
                        OrderRecipeId = orderRecipy.Id,
                        IngredientId = orderRecipeIngredientDTO.IngredientId,
                        Quantity = orderRecipeIngredientDTO.Quantity,
                        Rate = orderRecipeIngredientDTO.Rate
                    };
                    _context.OrderRecipeIngredients.Add(orderRecipeIngredient);
                    await _context.SaveChangesAsync();
                }
            }


            return order;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            
            var order = await _context.Orders.FindAsync(id);
          
            List<OrderRecipy> orderRecipies  = await _context.OrderRecipies.Where(orderRecipe =>  orderRecipe.OrderId == id).ToListAsync();
            foreach (var orderRecipe in orderRecipies)
            {
                List<OrderRecipeIngredient> orderRecipeIngredients = await _context.OrderRecipeIngredients.Where(ori=>ori.OrderRecipeId == orderRecipe.Id).ToListAsync();

                foreach (var item in orderRecipeIngredients)
                {
                    _context.OrderRecipeIngredients.Remove(item);
                }
                _context.OrderRecipies.Remove(orderRecipe);
            }
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
 
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.Include(o=>o.OrderRecipies).ThenInclude(orec=>orec.OrderRecipeIngredients).FirstAsync(o=>o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> PutOrder(int id, OrderDTO orderDTO)
        {
            //delete OrderRecipies and OrderRecipeIngredients for this Order
            List<OrderRecipy> orderRecipies = await _context.OrderRecipies.Where(orderRecipe => orderRecipe.OrderId == id).ToListAsync();
            foreach (var orderRecipe in orderRecipies)
            {
                List<OrderRecipeIngredient> orderRecipeIngredients = await _context.OrderRecipeIngredients.Where(ori => ori.OrderRecipeId == orderRecipe.Id).ToListAsync();

                foreach (var item in orderRecipeIngredients)
                {
                    _context.OrderRecipeIngredients.Remove(item);
                }
                _context.OrderRecipies.Remove(orderRecipe);
            }
            Order order = new Order()
            {
                Id = id,
                Odate = orderDTO.Odate,
                Edate = orderDTO.Edate,
                EventTime = orderDTO.EventTime,
                Occasion = orderDTO.Occasion,
                NoOfPerson = orderDTO.NoOfPerson,
                Name = orderDTO.Name,
                Address = orderDTO.Address,
                Email = orderDTO.Email,
                MobileNo = orderDTO.MobileNo,
                Amount = orderDTO.Amount,
                BillAmount = orderDTO.BillAmount,
                UserId = orderDTO.UserId,
                Status = orderDTO.Status

            };
            await _context.SaveChangesAsync();

            foreach (var orderRecipeDTO in orderDTO.OrderRecipies)
            {
                OrderRecipy orderRecipy = new OrderRecipy()
                {
                    OrderId = order.Id,
                    RecipeId = orderRecipeDTO.RecipeId,
                    Amount = orderRecipeDTO.Amount,
                    BillAmount = orderRecipeDTO.BillAmount
                };
                _context.OrderRecipies.Add(orderRecipy);
                await _context.SaveChangesAsync();
                foreach (var orderRecipeIngredientDTO in orderRecipeDTO.OrderRecipeIngredients)
                {
                    OrderRecipeIngredient orderRecipeIngredient = new OrderRecipeIngredient()
                    {
                        OrderRecipeId = orderRecipy.Id,
                        IngredientId = orderRecipeIngredientDTO.IngredientId,
                        Quantity = orderRecipeIngredientDTO.Quantity,
                        Rate = orderRecipeIngredientDTO.Rate
                    };
                    _context.OrderRecipeIngredients.Add(orderRecipeIngredient);
                    _context.Entry(order).State = EntityState.Modified;

                    await _context.SaveChangesAsync();
                }
            }
            return order;
        }

        [HttpGet("printbazaarlist/{orderId}")]
        public async Task<IActionResult> GetRecipeIngredients(int orderId)
        {
            /* string query = "SELECT I.Name AS IngredientName, U.Name AS UnitName, SUM(ORI.Quantity) AS TotalQuantity";
             query += "FROM Ingredients AS I INNER JOIN OrderRecipeIngredients AS ORI ON I.Id = ORI.IngredientId";
             query += "INNER JOIN OrderRecipies AS OR1 ON OR1.Id = ORI.OrderRecipeId";
             query += "INNER JOIN Units AS U ON U.Id = I.UnitId";
             query += "WHERE OR1.OrderId = " + orderId + " GROUP BY I.Name, U.Name";*/

            string query = @"
        SELECT I.Name AS IngredientName, U.Name AS UnitName, SUM(ORI.Quantity) AS TotalQuantity
        FROM Ingredients AS I
        INNER JOIN OrderRecipeIngredients AS ORI ON I.Id = ORI.IngredientId
        INNER JOIN OrderRecipies AS OR1 ON OR1.Id = ORI.OrderRecipeId
        INNER JOIN Units AS U ON U.Id = I.UnitId
        WHERE OR1.OrderId = " + orderId + 
        "GROUP BY I.Name, U.Name";

            string constr = configuration.GetConnectionString("DbConStr");

            SqlConnection con = new SqlConnection(constr);
            SqlDataAdapter da = new SqlDataAdapter(query, con);
            DataTable dtable = new DataTable();

            da.Fill(dtable);
            return Ok(dtable);

        }


    }
}
