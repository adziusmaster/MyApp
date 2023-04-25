using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Models;
using Microsoft.EntityFrameworkCore;

namespace App.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Painting> PaintingsList { get; set; }
        public DbSet<User> UserList { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            PaintingsList = Set<Painting>();
            UserList = Set<User>();
        }
      
    }  
}