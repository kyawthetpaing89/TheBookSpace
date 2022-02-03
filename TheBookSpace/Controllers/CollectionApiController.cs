using System.Web.Http;
using TBS_Model;
using Collection_BL;

namespace TheBookSpace.Controllers
{
    public class CollectionApiController : ApiController
    {
        [UserAuthentication]
        [HttpPost]
        public string GetCollection([FromBody] CollectionModel collectionModel)
        {
            CollectionBL collectionBL = new CollectionBL();
            return collectionBL.Collection_Select(collectionModel);
        }

        [UserAuthentication]
        [HttpPost]
        public string CollectionCUD([FromBody] CollectionModel collectionModel)
        {
            CollectionBL collectionBL = new CollectionBL();
            return collectionBL.Collection_CUD(collectionModel);
        }
    }
}
