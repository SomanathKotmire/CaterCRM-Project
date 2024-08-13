using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagerProject.Models;

public partial class Category
{
    [Key]
    public int Id { get; set; }

    [StringLength(500)]
    public string? Name { get; set; }

    [InverseProperty("Category")]
    public virtual ICollection<Recipy>? Recipies { get; set; } = new List<Recipy>();
}
