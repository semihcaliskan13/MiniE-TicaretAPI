﻿using Microsoft.EntityFrameworkCore;
using MiniE_TicaretAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniE_TicaretAPI.Application.Repositories
{
    //IRepository
    public interface IRepository<T> where T : BaseEntity
    {
        DbSet<T> Table { get; }
    }
}