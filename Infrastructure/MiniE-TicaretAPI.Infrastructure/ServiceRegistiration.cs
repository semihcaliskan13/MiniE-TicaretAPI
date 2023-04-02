using Microsoft.Extensions.DependencyInjection;
using MiniE_TicaretAPI.Application.Abstractions.Storage;
using MiniE_TicaretAPI.Application.Abstractions.Token;
using MiniE_TicaretAPI.Application.Repositories;
using MiniE_TicaretAPI.Domain.Entities;
using MiniE_TicaretAPI.Infrastructure.Services;
using MiniE_TicaretAPI.Infrastructure.Services.Storage;
using MiniE_TicaretAPI.Infrastructure.Services.Token;
using MiniE_TicaretAPI.Infrastructure.SqlTableDependency;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Infrastructure
{
    public static class ServiceRegistiration
    {
        public static void AddInfrastructureServices(this IServiceCollection services)
        {//DbContext'i IOC Container'a vermek için bu metodu yazdık ve IOC Container'a artık buradan vereceğiz servisleri.
         //Çünkü program.cs karışmaz ve oraya zaten Persistence'ı dahil ettik.         

            services.AddScoped<IStorageService, StorageService>();
            //services.AddSingleton<DatabaseSubscription<Product>>();
            services.AddSingleton<DatabaseSubscription<Offer>>();
            services.AddScoped<ITokenHandler,TokenHandler>();

        }
        public static void AddStorage<T>(this IServiceCollection services) where T : Storage, IStorage
        {
            services.AddScoped<IStorage, T>();
        }

    }
}
