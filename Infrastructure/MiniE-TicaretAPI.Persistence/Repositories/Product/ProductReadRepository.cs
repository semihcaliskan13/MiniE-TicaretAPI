using MiniE_TicaretAPI.Application.Repositories.Product;
using MiniE_TicaretAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Persistence.Repositories.Product
{
    public class ProductReadRepository : ReadRepository<MiniE_TicaretAPI.Domain.Entities.Product>, IProductReadRepository
    {
        public ProductReadRepository(MiniE_TicaretAPIDbContext context) : base(context)
        {
        }
    }
}
