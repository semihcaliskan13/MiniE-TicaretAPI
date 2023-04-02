using MiniE_TicaretAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Domain.Entities
{
    public class Offer : BaseEntity
    {
        
        public string OfferPrice { get; set; }
        public ICollection<Product>? Products { get; set; }

    }
}
