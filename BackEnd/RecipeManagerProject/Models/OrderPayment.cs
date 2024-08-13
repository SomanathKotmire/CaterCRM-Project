using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagerProject.Models;

public partial class OrderPayment
{
    [Key]
    public int Id { get; set; }

    public int? OrderId { get; set; }

    public double? Amount { get; set; }

    [Column("PDate")]
    public DateOnly? Pdate { get; set; }

    [StringLength(50)]
    public string? Mode { get; set; }

    [StringLength(500)]
    public string? Narration { get; set; }

    public int? UserId { get; set; }

    [ForeignKey("OrderId")]
    [InverseProperty("OrderPayments")]
    public virtual Order? Order { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("OrderPayments")]
    public virtual User? User { get; set; }
}
