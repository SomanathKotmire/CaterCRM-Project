using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using RecipeManagerProject.Models;

namespace RecipeManagerProject.Context;

public partial class ProjectDBContext : DbContext
{
    

    public ProjectDBContext(DbContextOptions<ProjectDBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderPayment> OrderPayments { get; set; }

    public virtual DbSet<OrderRecipeIngredient> OrderRecipeIngredients { get; set; }

    public virtual DbSet<OrderRecipy> OrderRecipies { get; set; }

    public virtual DbSet<RecipeIngredient> RecipeIngredients { get; set; }

    public virtual DbSet<Recipy> Recipies { get; set; }

    public virtual DbSet<Unit> Units { get; set; }

    public virtual DbSet<User> Users { get; set; }

  
}
