using System.Web.Http;
using TBS_Model;
using Book_BL;
using System.IO;

namespace TheBookSpace.Controllers
{
    public class BookApiController : ApiController
    {
        [UserAuthentication]
        [HttpPost]
        public string BookCUD([FromBody] BookModel bookModel)
        {
            BookBL bookBL = new BookBL();
            return bookBL.Book_CUD(bookModel);
        }

        [UserAuthentication]
        [HttpPost]
        public string GetBook([FromBody] BookModel bookModel)
        {
            BookBL bookBL = new BookBL();
            return bookBL.Book_Select(bookModel);
        }
    }
}
