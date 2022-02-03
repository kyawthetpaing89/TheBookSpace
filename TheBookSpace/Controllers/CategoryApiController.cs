using System.Web.Http;
using Category_BL;
using TBS_Model;


namespace TheBookSpace.Controllers
{
    public class CategoryApiController : ApiController
    {
        [UserAuthentication]
        [HttpPost]
        public string CategoryCUD([FromBody] CategoryModel CategoryModel)
        {
            CategoryBL CategoryBL = new CategoryBL();
            return CategoryBL.Category_CUD(CategoryModel);
        }

        [UserAuthentication]
        [HttpPost]
        public string GetCategory([FromBody] CategoryModel CategoryModel)
        {
            CategoryBL CategoryBL = new CategoryBL();
            return CategoryBL.Category_Select(CategoryModel);
        }
    }
}
