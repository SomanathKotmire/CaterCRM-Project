using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagerProject.Models;

public partial class Ingredient
{
    [Key]
    public int Id { get; set; }

    [StringLength(500)]
    public string? Name { get; set; }

    public int? UnitId { get; set; }

    public double? Rate { get; set; }

    [StringLength(500)]
    public string? ImagePath { get; set; }

    [InverseProperty("Ingredient")]
    public virtual ICollection<OrderRecipeIngredient>? OrderRecipeIngredients { get; set; } = new List<OrderRecipeIngredient>();

    [InverseProperty("Ingredient")]
    public virtual ICollection<RecipeIngredient>? RecipeIngredients { get; set; } = new List<RecipeIngredient>();

    [ForeignKey("UnitId")]
    [InverseProperty("Ingredients")]
    public virtual Unit? Unit { get; set; }
}
