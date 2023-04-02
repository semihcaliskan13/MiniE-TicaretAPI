using MiniE_TicaretAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Domain.Entities
{
    public class Category:BaseEntity
    {
        public string? CategoryName { get; set; }
        [JsonIgnore]//Bu cycle durumunu düzelten mucize. şu beni günler uğraştırdı sadece şu satır.
        public ICollection<Product> Products { get; set; }
    }
}
