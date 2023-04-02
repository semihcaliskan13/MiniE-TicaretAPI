using MiniE_TicaretAPI.Application.Repositories.Product;
using MiniE_TicaretAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Persistence.Repositories.Product
{
    public class ProductWriteRepository : WriteRepository<MiniE_TicaretAPI.Domain.Entities.Product>, IProductWriteRepository
    {
        public ProductWriteRepository(MiniE_TicaretAPIDbContext context) : base(context)
        {
        }
    }
}
