using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagerProject.Models;

public partial class OrderRecipeIngredient
{
    [Key]
    public int Id { get; set; }

    public int? OrderRecipeId { get; set; }

    public int? IngredientId { get; set; }

    public double? Quantity { get; set; }

    public double? Rate { get; set; }

    [ForeignKey("IngredientId")]
    [InverseProperty("OrderRecipeIngredients")]
    public virtual Ingredient? Ingredient { get; set; }

    [ForeignKey("OrderRecipeId")]
    [InverseProperty("OrderRecipeIngredients")]
    public virtual OrderRecipy? OrderRecipe { get; set; }
}
