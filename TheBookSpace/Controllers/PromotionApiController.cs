using System.Web.Http;
using TBS_Model;
using Promotion_BL;

namespace TheBookSpace.Controllers
{
    public class PromotionApiController : ApiController
    {
        [UserAuthentication]
        [HttpPost]
        public string PromotionCUD([FromBody] PromotionModel promotionModel)
        {
            PromotionBL promotionBL = new PromotionBL();
            return promotionBL.Promotion_CUD(promotionModel);
        }

        [UserAuthentication]
        [HttpPost]
        public string GetPromotion([FromBody] PromotionModel promotionModel)
        {
            PromotionBL promotionBL = new PromotionBL();
            return promotionBL.Promotion_Select(promotionModel);
        }
    }
}
