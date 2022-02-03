using System.Web.Mvc;
using Publisher_BL;
using TBS_Model;

namespace TheBookSpace.Controllers
{
    public class PublisherController : Controller
    {
        // GET: Publisher
        public ActionResult PublisherList()
        {
            return View();
        }

        public ActionResult PublisherEntry(PublisherModel PublisherModel)
        {
            if (string.IsNullOrWhiteSpace(PublisherModel.Mode))
                PublisherModel.Mode = "New";
            else
            {
                PublisherBL PublisherBL = new PublisherBL();
                PublisherModel = PublisherBL.Publisher_SelectModel(PublisherModel);
            }
            return View(PublisherModel);
        }
    }
}