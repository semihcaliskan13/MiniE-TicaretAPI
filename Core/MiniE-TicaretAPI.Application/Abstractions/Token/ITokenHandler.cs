using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Application.Abstractions.Token
{
    public interface ITokenHandler
    {
        Domain.DTOS.Token CreateAccess(int minute, string userId);
    }
}
