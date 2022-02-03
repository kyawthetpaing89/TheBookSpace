using System.Web.Mvc;
using TBS_Model;

namespace TheBookSpace.Controllers
{
    public class CollectionController : Controller
    {
        // GET: Collection
        public ActionResult CollectionList(CollectionModel collectionModel)
        {          
            return View(collectionModel);
        }
    }
}