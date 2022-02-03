using System.Web.Http;
using TBS_Model;
using Author_BL;

namespace TheBookSpace.Controllers
{
    public class AuthorApiController : ApiController
    {
        [UserAuthentication]
        [HttpPost]
        public string AuthorCUD([FromBody] AuthorModel authorModel)
        {
            AuthorBL authorBL = new AuthorBL();
            return authorBL.Author_CUD(authorModel);
        }

        [UserAuthentication]
        [HttpPost]
        public string GetAuthor([FromBody] AuthorModel authorModel)
        {
            AuthorBL authorBL = new AuthorBL();
            return authorBL.Author_Select(authorModel);
        }
    }
}
