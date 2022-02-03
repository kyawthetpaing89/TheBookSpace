using System.Web.Http;
using Publisher_BL;
using TBS_Model;

namespace TheBookSpace.Controllers
{
    public class PublisherApiController : ApiController
    {
        [UserAuthentication]
        [HttpPost]
        public string PublisherCUD([FromBody] PublisherModel publisherModel)
        {
            PublisherBL publisherBL = new PublisherBL();
            return publisherBL.Publisher_CUD(publisherModel);
        }

        [UserAuthentication]
        [HttpPost]
        public string GetPublisher([FromBody] PublisherModel publisherModel)
        {
            PublisherBL publisherBL = new PublisherBL();
            return publisherBL.Publisher_Select(publisherModel);
        }
    }
}
