using TBS_Model;
using System.Web.Http;
using Series_BL;

namespace TheBookSpace.Controllers
{
    public class SeriesApiController : ApiController
    {
        [UserAuthentication]
        [HttpPost]
        public string SeriesCUD([FromBody] SeriesModel SeriesModel)
        {
            SeriesBL SeriesBL = new SeriesBL();
            return SeriesBL.Series_CUD(SeriesModel);
        }

        [UserAuthentication]
        [HttpPost]
        public string GetSeries([FromBody] SeriesModel SeriesModel)
        {
            SeriesBL SeriesBL = new SeriesBL();
            return SeriesBL.Series_Select(SeriesModel);
        }
    }
}
