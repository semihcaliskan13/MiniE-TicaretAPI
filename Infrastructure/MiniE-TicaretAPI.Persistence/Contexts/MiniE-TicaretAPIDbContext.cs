using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using MiniE_TicaretAPI.Domain.Entities;
using MiniE_TicaretAPI.Domain.Entities.Common;
using MiniE_TicaretAPI.Domain.Entities.Identity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Persistence.Contexts
{
    public class MiniE_TicaretAPIDbContext : IdentityDbContext<AppUser, AppRole, int>
    {
        public MiniE_TicaretAPIDbContext()
        {
        }

        public MiniE_TicaretAPIDbContext(DbContextOptions options) : base(options)
        {
        }
        

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Offer> Offers { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            
            var datas = ChangeTracker.Entries<BaseEntity>();
            foreach (var data in datas)
            {
                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedTime = DateTime.Now,
                    EntityState.Modified => data.Entity.UpdatedTime = DateTime.Now,
                    _ => DateTime.Now,
                };
            }


            return await base.SaveChangesAsync(cancellationToken);
        }

    }
}
