using Microsoft.EntityFrameworkCore;//Bu dahil edilmeli.
using Microsoft.Extensions.Configuration;//Bunun paketi yüklenmeli ve dahil edilmeli.
using Microsoft.Extensions.DependencyInjection;
using MiniE_TicaretAPI.Persistence.Contexts;
using MiniE_TicaretAPI.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MiniE_TicaretAPI.Application.Repositories.Product;
using MiniE_TicaretAPI.Persistence.Repositories;
using MiniE_TicaretAPI.Persistence.Repositories.Product;
using MiniE_TicaretAPI.Application.Repositories;
using MiniE_TicaretAPI.Application.Repositories.Category;

namespace MiniE_TicaretAPI.Persistence
{
    public static class ServiceRegistiration
    {
    public static void AddPersistenceServices(this IServiceCollection services)
        {//DbContext'i IOC Container'a vermek için bu metodu yazdık ve IOC Container'a artık buradan vereceğiz servisleri.
            //Çünkü program.cs karışmaz ve oraya zaten Persistence'ı dahil ettik.
            services.AddDbContext<MiniE_TicaretAPIDbContext>(options => options.UseSqlServer(Configuration.ConnectionString));
            services.AddScoped<IProductReadRepository, ProductReadRepository>();
            services.AddScoped<IProductWriteRepository, ProductWriteRepository>();

            services.AddScoped<ICategoryReadRepository,CategoryReadRepository>();
            services.AddScoped<ICategoryWriteRepository,CategoryWriteRepository>();

            services.AddScoped<IOrderReadRepository, OrderReadRepository>();
            services.AddScoped<IOrderWriteRepository, OrderWriteRepository>();  

            services.AddScoped<IOfferReadRepository,OfferReadRepository>();
            services.AddScoped<IOfferWriteRepository, OfferWriteRepository>();  
            
            

            services.AddIdentity<AppUser, AppRole>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;//gibi buradan default sınırlamalar kaldırılabilir.
                options.User.RequireUniqueEmail= true;
                
                
            }).AddEntityFrameworkStores<MiniE_TicaretAPIDbContext>();

        }
    }
}
