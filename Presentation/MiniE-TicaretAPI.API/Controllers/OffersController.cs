using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiniE_TicaretAPI.Application.Repositories;
using MiniE_TicaretAPI.Domain.Entities;

namespace MiniE_TicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController : ControllerBase
    {
        readonly IOfferReadRepository _offerReadRepository;
        readonly IOfferWriteRepository _offerWriteRepository;
        public OffersController(IOfferReadRepository offerReadRepository, IOfferWriteRepository offerWriteRepository)
        {
            _offerReadRepository = offerReadRepository;
            _offerWriteRepository = offerWriteRepository;
        }

        [HttpGet]
        public IActionResult GetOffers()
        {
            var datas = _offerReadRepository.GetAll().ToList();
            return Ok(datas);
        }

        [HttpPost]
        public async Task<IActionResult> PostOffers(Offer offer)
        {
            await _offerWriteRepository.AddAsync(offer);
            await _offerWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(Offer offer)
        {
            Offer _offer = new Offer()
            {
                OfferPrice = offer.OfferPrice,
                CreatedTime =offer.CreatedTime,
                UpdatedTime = offer.UpdatedTime,
                Id = offer.Id
            };
            _offerWriteRepository.Update(_offer);
            await _offerWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
