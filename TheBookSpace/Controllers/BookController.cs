using TBS_Model;
using System.Web.Mvc;
using Book_BL;
using System.Web;
using System.IO;
using System;
using Newtonsoft.Json;
using System.Data;

namespace TheBookSpace.Controllers
{
    public class BookController : Controller
    {
        // GET: Book
        public ActionResult BookList()
        {
            return View();
        }

        public ActionResult BookEntry(BookModel bookModel)
        {
            if (string.IsNullOrWhiteSpace(bookModel.Mode))
                bookModel.Mode = "New";
            else
            {
                BookBL bookBL = new BookBL();
                bookModel = bookBL.Book_SelectModel(bookModel);
            }
            return View(bookModel);
        }

        [HttpPost]
        public ActionResult UploadFiles()
        {
            try
            {
                string j1 = HttpContext.Request.Params.Get("BookModel");
                BookModel bookModel = JsonConvert.DeserializeObject<BookModel>(j1);

                BookBL bookBL = new BookBL();

                if (bookModel.Mode == "New" || bookModel.Mode == "Copy")
                {
                    DataTable dt = bookBL.BookCounter_Select(bookModel);
                    bookModel.BookCD = dt.Rows[0]["CounterCD"].ToString();
                }

                Int64 bookcd = Convert.ToInt64(bookModel.BookCD);

                Int64 j = 300;
                while (bookcd > j)
                {
                    j += 300;
                }

                if (!Directory.Exists(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/") + j))
                    Directory.CreateDirectory(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/") + j);

                for (int i = 0; i < Request.Files.Count; i++)
                {
                    string key = Request.Files.GetKey(i);
                    if (key == "fcover")
                    {
                        bookModel.CoverImageUrl = j + "/" + bookModel.BookCD + "_cover.jpg";

                        if (System.IO.File.Exists(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_cover.jpg")))
                            System.IO.File.Delete(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_cover.jpg"));

                        Request.Files[i].SaveAs(Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/"), bookModel.CoverImageUrl));
                    }
                    else if (key == "f1")
                    {
                        bookModel.SampleImageUrl1 = j + "/" + bookModel.BookCD + "_sample1.jpg";

                        if (System.IO.File.Exists(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_sample1.jpg")))
                            System.IO.File.Delete(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_sample1.jpg"));

                        Request.Files[i].SaveAs(Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/"), bookModel.SampleImageUrl1));
                    }
                    else if (key == "f2")
                    {
                        bookModel.SampleImageUrl2 = j + "/" + bookModel.BookCD + "_sample2.jpg";

                        if (System.IO.File.Exists(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_sample2.jpg")))
                            System.IO.File.Delete(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_sample2.jpg"));

                        Request.Files[i].SaveAs(Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/"), bookModel.SampleImageUrl2));
                    }
                    else if (key == "f3")
                    {
                        bookModel.SampleImageUrl3 = j + "/" + bookModel.BookCD + "_sample3.jpg";

                        if (System.IO.File.Exists(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_sample3.jpg")))
                            System.IO.File.Delete(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_sample3.jpg"));

                        Request.Files[i].SaveAs(Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/"), bookModel.SampleImageUrl3));
                    }
                    else if (key == "f4")
                    {
                        bookModel.SampleImageUrl4 = j + "/" + bookModel.BookCD + "_sample4.jpg";

                        if (System.IO.File.Exists(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_sample4.jpg")))
                            System.IO.File.Delete(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_sample4.jpg"));

                        Request.Files[i].SaveAs(Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/"), bookModel.SampleImageUrl4));
                    }
                    else if (key == "f5")
                    {
                        bookModel.SampleImageUrl5 = j + "/" + bookModel.BookCD + "_sample5.jpg";

                        if (System.IO.File.Exists(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_sample5.jpg")))
                            System.IO.File.Delete(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/" + j + "/" + bookModel.BookCD + "_sample5.jpg"));

                        Request.Files[i].SaveAs(Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/BookImages/"), bookModel.SampleImageUrl5));
                    }

                }

                return Json(new { message = bookBL.Book_CUD(bookModel) });
            }
            catch(Exception e)
            {
                return Json(new { message = e.Message });
            }
        }
    }
}