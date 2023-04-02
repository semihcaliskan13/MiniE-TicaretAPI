using MiniE_TicaretAPI.Application.Repositories;
using MiniE_TicaretAPI.Domain.Entities;
using MiniE_TicaretAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Persistence.Repositories
{
    public class OfferReadRepository : ReadRepository<Offer>, IOfferReadRepository
    {
        public OfferReadRepository(MiniE_TicaretAPIDbContext context) : base(context)
        {
        }
    }
}
