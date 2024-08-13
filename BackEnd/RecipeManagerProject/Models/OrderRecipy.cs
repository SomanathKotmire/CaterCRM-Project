using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagerProject.Models;

public partial class OrderRecipy
{
    [Key]
    public int Id { get; set; }

    public int? OrderId { get; set; }

    public int? RecipeId { get; set; }

    public double? Amount { get; set; }

    public double? BillAmount { get; set; }

    [ForeignKey("OrderId")]
    [InverseProperty("OrderRecipies")]
    public virtual Order? Order { get; set; }

    [InverseProperty("OrderRecipe")]
    public virtual ICollection<OrderRecipeIngredient>? OrderRecipeIngredients { get; set; } = new List<OrderRecipeIngredient>();

    [ForeignKey("RecipeId")]
    [InverseProperty("OrderRecipies")]
    public virtual Recipy? Recipe { get; set; }
}
