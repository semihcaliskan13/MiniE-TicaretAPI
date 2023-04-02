using MiniE_TicaretAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Domain.Entities
{
    public class Product:BaseEntity
    {
        public string? Name { get; set; }
        public decimal? Price { get; set; }
        public int? Stock { get; set; }
        public int CategoryId { get; set; }
        [NotMapped ]
        public string? CategoryName { get; set; }
        public Category Category { get; set; }
        public Offer? Offer { get; set; }
        public int? OfferId { get; set; }

    }
}
