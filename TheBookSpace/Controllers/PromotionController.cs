using TBS_Model;
using System.Web.Mvc;
using Promotion_BL;


namespace TheBookSpace.Controllers
{
    public class PromotionController : Controller
    {
        // GET: Promotion
        public ActionResult PromotionList()
        {
            return View();
        }
        public ActionResult PromotionEntry(PromotionModel promotionModel)
        {
            if (string.IsNullOrWhiteSpace(promotionModel.Mode))
                promotionModel.Mode = "New";
            else
            {
                PromotionBL promotionBL = new PromotionBL();
                promotionModel = promotionBL.Promotion_SelectModel(promotionModel);
            }
            return View(promotionModel);
        }
    }
}