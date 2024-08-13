using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RecipeManagerProject.Context;
using RecipeManagerProject.Models;

namespace RecipeManagerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipiesController : ControllerBase
    {
        private readonly ProjectDBContext _context;
        IConfiguration configuration;

        public RecipiesController(ProjectDBContext context, IConfiguration configuration)
        {
            _context = context;
            this.configuration = configuration;
        }

        // GET: api/Recipies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipy>>> GetRecipies()
        {
            return await _context.Recipies.Include(recipe=>recipe.Category).Include(recipe=>recipe.RecipeIngredients).ToListAsync();
        }

        // GET: api/Recipies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipy>> GetRecipy(int id)
        {
            var recipy = await _context.Recipies.FindAsync(id);

            if (recipy == null)
            {
                return NotFound();
            }

            return recipy;
        }

        // PUT: api/Recipies/5
      
        [HttpPut("{id}")]
        public async Task<ActionResult<Recipy>> PutRecipy(int id, Recipy recipy)
        {
            if (id != recipy.Id)
            {
                return BadRequest();
            }

            _context.Entry(recipy).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return recipy;
        }

        // POST: api/Recipies
      
        [HttpPost]
        public async Task<ActionResult<Recipy>> PostRecipy(Recipy recipy)
        {
            _context.Recipies.Add(recipy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecipy", new { id = recipy.Id }, recipy);
        }

        // DELETE: api/Recipies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipy(int id)
        {
            var recipy = await _context.Recipies.FindAsync(id);
            if (recipy == null)
            {
                return NotFound();
            }

            _context.Recipies.Remove(recipy);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("addingredient")]
        public async Task<IActionResult> AddIngredient(RecipeIngredient recipeIngredient)
        {
            if(recipeIngredient.Id == 0)
            {
                _context.RecipeIngredients.Add(recipeIngredient);
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.Entry(recipeIngredient).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
           
            return Ok(recipeIngredient);
        }

        [HttpDelete("removeingredient/{id}")]
        public async Task<IActionResult> DeleteRecipeIngredient(int id)
        {
            var recipeIngredient = await _context.RecipeIngredients.FindAsync(id);
            _context.RecipeIngredients.Remove(recipeIngredient);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("listingredients/{recipeid}")]
        public async Task<IActionResult> GetRecipeIngredients(int recipeid)
        {
            // string query = "SELECT RI.*, I.Name AS IngredientName, U.Name AS UnitName From RecipeIngredients AS RI ";
            //query += "INNER JOIN Ingredients AS I ON I.Id = RI.IngredientId";
            //query += "INNER JOIN Units AS U ON U.Id = I.UnitId WHERE RI.RecipeId = " + recipeid;
            //string constr = configuration.GetConnectionString("DBConStr");
            //SqlConnection con = new SqlConnection(constr);
            //SqlDataAdapter da = new SqlDataAdapter(query, con);
            //DataTable dtable = new DataTable();
            //da.Fill(dtable);
            //return Ok(dtable);

            var riResult = (from ri in _context.RecipeIngredients
                      join ingredient in _context.Ingredients
                      on ri.IngredientId equals ingredient.Id
                      join unit in _context.Units
                      on ingredient.UnitId equals unit.Id
                      where ri.RecipeId == recipeid
                      select new
                      {
                          Id = ri.Id,
                          ingredientId = ingredient.Id,
                          IngredientName = ingredient.Name,
                          UnitName = unit.Name,
                          Quantity = ri.Quantity,
                         recipeid = recipeid
                      });
            return Ok(riResult);

        }




    }
}
