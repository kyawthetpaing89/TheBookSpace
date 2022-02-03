using TBS_Model;
using System.Web.Mvc;
using Series_BL;

namespace TheBookSpace.Controllers
{
    public class SeriesController : Controller
    {
        // GET: Series
        public ActionResult SeriesList()
        {
            return View();
        }

        public ActionResult SeriesEntry(SeriesModel SeriesModel)
        {
            if (string.IsNullOrWhiteSpace(SeriesModel.Mode))
                SeriesModel.Mode = "New";
            else
            {
                SeriesBL SeriesBL = new SeriesBL();
                SeriesModel = SeriesBL.Series_SelectModel(SeriesModel);
            }
            return View(SeriesModel);
        }
    }
}