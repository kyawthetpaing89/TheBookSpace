using System.Web.Mvc;

namespace TheBookSpace.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Dashboard()
        {
            return View();
        }

        public ActionResult CreateSession(string key, string value)
        {
            Session[key] = value;

            return this.Json(new { success = true });
        }

        public ActionResult HomePage()
        {
            return View();
        }
    }
}