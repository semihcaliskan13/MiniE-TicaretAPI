using MiniE_TicaretAPI.Domain.Entities.Identity;
using MiniE_TicaretAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MiniE_TicaretAPI.Domain.Entities.Common;

namespace MiniE_TicaretAPI.Domain.ViewModel
{
    public class OrderCreateVM : BaseEntity
    {
        public string Description { get; set; }
        public string Address { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }


    }
}
