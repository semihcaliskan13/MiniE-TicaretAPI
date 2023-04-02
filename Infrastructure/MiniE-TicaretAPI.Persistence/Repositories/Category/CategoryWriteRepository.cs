using MiniE_TicaretAPI.Application.Repositories.Category;
using MiniE_TicaretAPI.Domain.Entities;
using MiniE_TicaretAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Persistence.Repositories
{
    public class CategoryWriteRepository : WriteRepository<Category>,ICategoryWriteRepository
    {
        public CategoryWriteRepository(MiniE_TicaretAPIDbContext context) : base(context)
        {
        }
    }
}
