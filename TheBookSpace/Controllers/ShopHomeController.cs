using TBS_Model;
using System.Web.Mvc;
using System.Data;
using Collection_BL;

namespace TheBookSpace.Controllers
{
    public class ShopHomeController : Controller
    {
        // GET: ShopHome
        public ActionResult ShopHome()
        {
            CollectionModel collectionModel = new CollectionModel();
            CollectionBL collectionBL = new CollectionBL();
            collectionModel.dsShopHome = collectionBL.Collection_ShopHome_Select(collectionModel);
            return View(collectionModel);
        }
    }
}