using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniE_TicaretAPI.Application.Repositories;
using MiniE_TicaretAPI.Domain.Entities;
using MiniE_TicaretAPI.Domain.ViewModel;
using System.Net;

namespace MiniE_TicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {

        private readonly IOrderReadRepository _orderReadRepository;
        private readonly IOrderWriteRepository _orderWriteRepository;

        public OrdersController(IOrderWriteRepository orderWriteRepository, IOrderReadRepository orderReadRepository)
        {
            _orderWriteRepository = orderWriteRepository;
            _orderReadRepository = orderReadRepository;
        }

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            //foreeach'dan daha iyi bir yapı.Daha hızlı sorgusu nedir?
            var orders = _orderReadRepository.GetAll().Include(data => data.Product).Select(data => new
            {
                data.ProductId,
                data.Id,
                data.Product.Name,
                data.Description,
                data.Address,
                data.CreatedTime,
                data.UpdatedTime,
                data.UserId,

            });
            return Ok(orders);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById([FromRoute] string id)
        {
            #region optimize olmayan
            //var data = await _orderReadRepository.Table.Include(order => order.Product)
            //    .Select(data => new
            //    {
            //        data.ProductId,
            //        data.Id,
            //        data.Product.Name,
            //        data.Description,
            //        data.Address,
            //        data.CreatedTime,
            //        data.UpdatedTime,
            //    }).FirstOrDefaultAsync(x => x.Id == int.Parse(id));
            //daha optimize alttaki.
            #endregion
            var data = await _orderReadRepository.Table.Include(order => order.Product)
               .Where(x => x.Id == int.Parse(id))
               .Select(data => new
               {
                   data.ProductId,
                   data.Id,
                   data.Product.Name,
                   data.Description,
                   data.Address,
                   data.CreatedTime,
                   data.UpdatedTime,
                   data.UserId,
               }).FirstOrDefaultAsync();
            return Ok(data);
        }

        [HttpGet("[action]/{userId}")]
        public async Task<IActionResult> GetOrderByUserId([FromRoute] string userId)
        {

            var data = await _orderReadRepository.Table.Include(order => order.Product)
               .Where(x => x.UserId == int.Parse(userId))
               .Select(data => new
               {
                   data.ProductId,
                   data.Id,
                   data.Product.Name,
                   data.Description,
                   data.Address,
                   data.CreatedTime,
                   data.UpdatedTime,
               }).FirstOrDefaultAsync();
            return Ok(data);

        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OrderCreateVM ocvm)
        {
            Order order = new Order
            {
                Address = ocvm.Address,
                Description = ocvm.Description,
                Id = ocvm.Id,
                ProductId = ocvm.ProductId,
                UserId = ocvm.UserId,
            };

            await _orderWriteRepository.AddAsync(order);
            await _orderWriteRepository.SaveAsync();
            //return StatusCode((int)(HttpStatusCode.Created));
            return StatusCode((int)StatusCodes.Status201Created);
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            await _orderWriteRepository.RemoveAsync(id);
            await _orderWriteRepository.SaveAsync();
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] OrderCreateVM ocvm)
        {
            Order order = new Order
            {
                Address = ocvm.Address,
                Description = ocvm.Description,
                Id = ocvm.Id,
                ProductId = ocvm.ProductId,
                UserId = ocvm.UserId,
            };

            _orderWriteRepository.Update(order);
            await _orderWriteRepository.SaveAsync();
            //return StatusCode((int)(HttpStatusCode.Created));
            return StatusCode((int)StatusCodes.Status201Created);
        }
    }
}
