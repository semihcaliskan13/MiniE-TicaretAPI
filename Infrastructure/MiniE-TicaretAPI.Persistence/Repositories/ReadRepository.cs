using Microsoft.EntityFrameworkCore;
using MiniE_TicaretAPI.Application.Repositories;
using MiniE_TicaretAPI.Domain.Entities.Common;
using MiniE_TicaretAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
        private readonly MiniE_TicaretAPIDbContext _context;

        public ReadRepository(MiniE_TicaretAPIDbContext context)
        {
            _context = context;
        }
        

        public DbSet<T> Table => _context.Set<T>();


        public IQueryable<T> GetAll(bool tracking = true)
        {
            var query = Table.AsQueryable();
            if (!tracking)
            {
                query = query.AsNoTracking();

            }
            return query;

        }

        public async Task<T> GetByIdAsync(string id, bool tracking = true)
        {
            var query = Table.AsQueryable();
            if (!tracking)
            {
                query = Table.AsNoTracking();
            }
            return await query.FirstOrDefaultAsync(data => data.Id == int.Parse(id));
        }

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true)
        {
            //var data=Table.FindAsync(method).Result;
            
            var query = Table.AsQueryable();
            if (!tracking)
            {
                query = query.AsNoTracking();
            }
            return await query.FirstOrDefaultAsync(method);
        }

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> method, bool tracking = true)
        {
            var query = Table.Where(method).AsQueryable();
            if (!tracking)
            {
                query = query.AsNoTracking();

            }
            return query;
        }
    }
}
