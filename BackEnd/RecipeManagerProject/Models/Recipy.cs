using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagerProject.Models;

public partial class Recipy
{
    [Key]
    public int Id { get; set; }

    public int? CategoryId { get; set; }

    [StringLength(500)]
    public string? Name { get; set; }

    public string? Discription { get; set; }

    public int? NoOfPerson { get; set; }

    [ForeignKey("CategoryId")]
    [InverseProperty("Recipies")]
    public virtual Category? Category { get; set; }

    [InverseProperty("Recipe")]
    public virtual ICollection<OrderRecipy>? OrderRecipies { get; set; } = new List<OrderRecipy>();

    [InverseProperty("Recipe")]
    public virtual ICollection<RecipeIngredient>? RecipeIngredients { get; set; } = new List<RecipeIngredient>();
}
