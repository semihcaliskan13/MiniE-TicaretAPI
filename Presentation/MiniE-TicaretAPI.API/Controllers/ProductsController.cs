using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniE_TicaretAPI.Application.Abstractions.Storage;
using MiniE_TicaretAPI.Application.Repositories.Product;
using MiniE_TicaretAPI.Domain.Entities;
using MiniE_TicaretAPI.Domain.ViewModel;

namespace MiniE_TicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = "User")]
    public class ProductsController : ControllerBase
    {
        readonly IProductReadRepository _productReadRepository;
        readonly IProductWriteRepository _productWriteRepository;
        readonly IStorageService _storageService;



        public ProductsController(IProductReadRepository productReadRepository, IProductWriteRepository productWriteRepository, IStorageService storageService)
        {
            _productReadRepository = productReadRepository;
            _productWriteRepository = productWriteRepository;
            _storageService = storageService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var datas = _productReadRepository.GetAll().Include(data => data.Category);
            foreach (var item in datas)
            {
                item.CategoryName = item.Category.CategoryName;
            }
            return Ok(datas);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById([FromRoute] string Id)
        {

            var data = await _productReadRepository.Table.Include(product => product.Category)
              .Where(x => x.Id == int.Parse(Id))
              .Select(data => new
              {
                  data.CategoryId,
                  data.Id,
                  data.Name,
                  data.Category.CategoryName,
                  data.Stock,
                  data.Price,
                  data.CreatedTime,
                  data.UpdatedTime,
              }).FirstOrDefaultAsync();
            return Ok(data);
        }
        [HttpGet("[action]/{data}")]
        public IActionResult GetWhere([FromRoute] string data)
        {
            var product = _productReadRepository.GetWhere(x => x.Id <= int.Parse(data));
            return Ok(product);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProductCreateVM pvm)
        {
            Product product = new Product
            {
                Id = pvm.Id,
                Name = pvm.Name,
                CategoryId = pvm.CategoryId,
                Price = pvm.Price,
                CreatedTime = pvm.CreatedTime,
                UpdatedTime = pvm.UpdatedTime,
                Stock = pvm.Stock,
                Offer = new Offer
                {
                    OfferPrice = pvm.Price.ToString(),

                }
            };

            await _productWriteRepository.AddAsync(product);
            int isOk = await _productWriteRepository.SaveAsync();

            return Ok();

        }
        [HttpGet("[action]/{data}")]
        public IActionResult GetWhereByCategory([FromRoute] string data)
        {
            var product = _productReadRepository.GetWhere(x => x.CategoryId == int.Parse(data));
            return Ok(product);
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(string Id)
        {
            await _productWriteRepository.RemoveAsync(Id);
            int isOk = await _productWriteRepository.SaveAsync();
            if (isOk == 1) { return Ok("Silindi"); }
            else { return BadRequest(); }

        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ProductCreateVM pvm)
        {
            Product product = new Product
            {
                Id = pvm.Id,
                Name = pvm.Name,
                CategoryId = pvm.CategoryId,
                Price = pvm.Price,
                CreatedTime = pvm.CreatedTime,
                UpdatedTime = pvm.UpdatedTime,
                Stock = pvm.Stock
            };
            _productWriteRepository.Update(product);
            await _productWriteRepository.SaveAsync();
            return Ok();
        }
        [HttpPost("[action]/{productId}")]
        public async Task<ActionResult> ProductImage([FromRoute] string productId, [FromQuery] string productName)
        {

            List<(string fileName, string pathOContainerName)> result = await _storageService.UploadAsync(productId, Request.Form.Files, productName);
            return Ok();

        }
        [HttpGet("[action]/{productId}")]
        public IActionResult GetProductImage([FromRoute] string productId, [FromQuery] string productName)
        {
            var datas = _storageService.GetFiles($"{productId}-{productName.ToLower()}");
            var lastData = "";
            foreach (var data in datas)
            {
                if (data.Contains(productName.ToString()))
                {
                    lastData = data;
                }

            }
            return Ok(lastData);
        }
        [HttpGet("[action]/{productId}")]
        public IActionResult GetOfferByProductId(string productId)
        {
            var datas = _productReadRepository.Table.Include(offer => offer.Offer).Where(data => data.Id == int.Parse(productId)).Select(data => new
            {
                OfferPrice = data.Offer.OfferPrice
            }).ToList();

            return Ok(datas[0]);

        }
        [HttpPut("[action]/{productId}")]
        public async Task<IActionResult> EditOffer(string productId, OfferVM offer)
        {
            //Product product = await _productReadRepository.GetByIdAsync(productId);
            Product product = _productReadRepository.Table.Include(offer => offer.Offer).FirstOrDefault(data => data.Id == int.Parse(productId));

            product.Offer.CreatedTime = product.Offer.CreatedTime;
            product.Offer.UpdatedTime = product.Offer.UpdatedTime; product.Offer.OfferPrice = offer.OfferPrice;
            product.Offer.Id = (int)product.OfferId;
            product.OfferId = product.OfferId;
            product.CreatedTime = product.CreatedTime;
            product.UpdatedTime = product.UpdatedTime;
            product.Stock = product.Stock;
            product.Price = product.Price;
            product.Category = product.Category;
            product.CategoryId = product.CategoryId;
            product.CategoryName = product.CategoryName;
            product.Id = product.Id;
            product.Name = product.Name;

            _productWriteRepository.Update(product);
            await _productWriteRepository.SaveAsync();
            return Ok();

        }






    }
}
