using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagerProject.Models;

public partial class RecipeIngredient
{
    [Key]
    public int Id { get; set; }

    public int? RecipeId { get; set; }

    public int? IngredientId { get; set; }

    public double? Quantity { get; set; }

    [ForeignKey("IngredientId")]
    [InverseProperty("RecipeIngredients")]
    public virtual Ingredient? Ingredient { get; set; }

    [ForeignKey("RecipeId")]
    [InverseProperty("RecipeIngredients")]
    public virtual Recipy? Recipe { get; set; }
}
