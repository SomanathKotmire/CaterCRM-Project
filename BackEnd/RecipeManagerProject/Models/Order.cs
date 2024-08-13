using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagerProject.Models;

public partial class Order
{
    [Key]
    public int Id { get; set; }

    [Column("ODate")]
    public DateOnly? Odate { get; set; }

    [Column("EDate")]
    public DateOnly? Edate { get; set; }

    [StringLength(50)]
    public string? EventTime { get; set; }

    [StringLength(500)]
    public string? Occasion { get; set; }

    public int? NoOfPerson { get; set; }

    [StringLength(500)]
    public string? Name { get; set; }

    [StringLength(500)]
    public string? Address { get; set; }

    [StringLength(500)]
    public string? Email { get; set; }

    [StringLength(500)]
    public string? MobileNo { get; set; }

    public double? Amount { get; set; }

    public double? BillAmount { get; set; }

    public int? UserId { get; set; }

    [StringLength(50)]
    public string? Status { get; set; }

    [InverseProperty("Order")]
    public virtual ICollection<OrderPayment>? OrderPayments { get; set; } = new List<OrderPayment>();

    [InverseProperty("Order")]
    public virtual ICollection<OrderRecipy>? OrderRecipies { get; set; } = new List<OrderRecipy>();

    [ForeignKey("UserId")]
    [InverseProperty("Orders")]
    public virtual User? User { get; set; }
}
