using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagerProject.Models;

public partial class User
{
    [Key]
    public int Id { get; set; }

    [StringLength(500)]
    public string? Name { get; set; }

    [StringLength(500)]
    public string? Email { get; set; }

    [StringLength(500)]
    public string? MobileNo { get; set; }

    [StringLength(500)]
    public string? Password { get; set; }

    [StringLength(500)]
    public string? ImagePath { get; set; }

    [InverseProperty("User")]
    public virtual ICollection<OrderPayment>? OrderPayments { get; set; } = new List<OrderPayment>();

    [InverseProperty("User")]
    public virtual ICollection<Order>? Orders { get; set; } = new List<Order>();

    public static implicit operator string(User v)
    {
        throw new NotImplementedException();
    }
}
