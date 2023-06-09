using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace App.Models
{
    public class Painting
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal? Price { get; set; }
    }
}