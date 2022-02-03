using TBS_Model;
using System.Web.Mvc;
using Author_BL;

namespace TheBookSpace.Controllers
{
    public class AuthorController : Controller
    {
        // GET: Author
        public ActionResult AuthorList()
        {
            return View();
        }

        public ActionResult AuthorEntry(AuthorModel authorModel)
        {
            if (string.IsNullOrWhiteSpace(authorModel.Mode))
                authorModel.Mode = "New";
            else
            {
                AuthorBL authorBL = new AuthorBL();
                authorModel = authorBL.Author_SelectModel(authorModel);
            }
            return View(authorModel);
        }
    }
}