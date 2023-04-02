using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiniE_TicaretAPI.Application.Repositories;
using MiniE_TicaretAPI.Application.Repositories.Category;
using MiniE_TicaretAPI.Domain.Entities;
using MiniE_TicaretAPI.Domain.ViewModel;

namespace MiniE_TicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        // post put delete getsinglename
        readonly ICategoryReadRepository _categoryReadRepository;
        readonly ICategoryWriteRepository _categoryWriteRepository;

        public CategoriesController(ICategoryReadRepository categoryReadRepository, ICategoryWriteRepository categoryWriteRepository)
        {
            _categoryReadRepository = categoryReadRepository;
            _categoryWriteRepository = categoryWriteRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var categories = _categoryReadRepository.GetAll();

            return Ok(categories);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById([FromRoute] string Id)
        {
            var category = await _categoryReadRepository.GetByIdAsync(Id);

            return Ok(category);
        }

        [HttpGet("[action]/{name}")]
        public IActionResult GetWhere([FromRoute] string name)
        {
            IQueryable<Category> category = _categoryReadRepository.GetWhere(data => data.CategoryName == name);
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoryCreateVM cvm)
        {
            Category category = new Category
            {
                Id = cvm.Id,
                CategoryName = cvm.Name,
            };


            await _categoryWriteRepository.AddAsync(category);
            await _categoryWriteRepository.SaveAsync();

            return Ok("başarılı mesela");
        }

        [HttpPut]
        public async Task<IActionResult> Update(CategoryCreateVM cvm)
        {
            Category category = new Category
            {
                Id = cvm.Id,
                CategoryName = cvm.Name,
            };

            _categoryWriteRepository.Update(category);
            await _categoryWriteRepository.SaveAsync();
            return Ok("güncellendi");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id) {

            await _categoryWriteRepository.RemoveAsync(id);
            await _categoryWriteRepository.SaveAsync();

            return Ok("silindi");
        }
    }
}
