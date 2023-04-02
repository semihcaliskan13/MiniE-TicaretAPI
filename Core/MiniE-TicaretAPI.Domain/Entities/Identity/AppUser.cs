using Microsoft.AspNetCore.Identity;

namespace MiniE_TicaretAPI.Domain.Entities.Identity
{
    public class AppUser : IdentityUser<int>
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public ICollection<Order> Orders { get; set; }

    }
}
