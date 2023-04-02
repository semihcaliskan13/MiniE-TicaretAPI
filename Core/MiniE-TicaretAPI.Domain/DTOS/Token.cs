using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Domain.DTOS
{
    public class Token
    {
        public string AccesssToken { get; set; }
        public DateTime Expiration { get; set; }
    }
}
