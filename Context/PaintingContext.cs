using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Models;
using Microsoft.EntityFrameworkCore;

namespace App.Context
{
    public class PaintingContext : DbContext
    {
        public PaintingContext(DbContextOptions<PaintingContext> options) : base(options)
        {

        }

        public DbSet<Painting>? PaintingsList { get; set; }
    }
}