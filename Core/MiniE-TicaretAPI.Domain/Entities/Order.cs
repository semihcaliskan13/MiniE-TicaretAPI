using MiniE_TicaretAPI.Domain.Entities.Common;
using MiniE_TicaretAPI.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Domain.Entities
{
    public class Order:BaseEntity
    {
        public string Description { get; set; }
        public string Address { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int? UserId { get; set; }

        public AppUser? User{ get; set; }
        
    }
}
