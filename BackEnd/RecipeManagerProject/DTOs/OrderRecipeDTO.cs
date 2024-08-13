using RecipeManagerProject.Models;

namespace RecipeManagerProject.DTOs
{
    public class OrderRecipeDTO
    {
        public double Amount;
        public List<OrderRecipeIngredient> orderRecipeIngredients;
    }
}
