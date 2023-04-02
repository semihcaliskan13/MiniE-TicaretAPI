using MiniE_TicaretAPI.Domain.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Domain.ViewModel
{
    public class UserResponseVM
    {
        
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public Token Token { get; set; }
    }
}
