using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagerProject.Models;

public partial class OrderDTO
{
    public int Id { get; set; }

    public DateOnly? Odate { get; set; }

    public DateOnly? Edate { get; set; }

    public string? EventTime { get; set; }

    public string? Occasion { get; set; }

    public int? NoOfPerson { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public string? Email { get; set; }

    public string? MobileNo { get; set; }

    public double? Amount { get; set; }

    public double? BillAmount { get; set; }

    public int? UserId { get; set; }

    public string? Status { get; set; }
    public virtual ICollection<OrderRecipy>? OrderRecipies { get; set; } = new List<OrderRecipy>();
}
