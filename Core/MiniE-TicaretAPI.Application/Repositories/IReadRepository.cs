using MiniE_TicaretAPI.Domain.Entities.Common;
using System.Linq.Expressions;

namespace MiniE_TicaretAPI.Application.Repositories
{
    //IReadRepository
    public interface IReadRepository<T> : IRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetAll(bool tracking = true);
        IQueryable<T> GetWhere(Expression<Func<T, bool>> method, bool tracking = true);
        
        Task<T> GetByIdAsync(string id, bool tracking = true);
        Task<T> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true);

    }
}
