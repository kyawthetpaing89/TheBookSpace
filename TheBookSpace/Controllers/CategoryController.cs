using System.Web.Mvc;
using Category_BL;
using TBS_Model;

namespace TheBookSpace.Controllers
{
    public class CategoryController : Controller
    {
        // GET: Category
        public ActionResult CategoryList()
        {
            return View();
        }

        public ActionResult CategoryEntry(CategoryModel CategoryModel)
        {
            if (string.IsNullOrWhiteSpace(CategoryModel.Mode))
                CategoryModel.Mode = "New";
            else
            {
                CategoryBL CategoryBL = new CategoryBL();
                CategoryModel = CategoryBL.Category_SelectModel(CategoryModel);
            }
            return View(CategoryModel);
        }
    }
}