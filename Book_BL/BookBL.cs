using CKM_CommonFunction;
using CKM_DataLayer;
using TBS_Model;
using System.Data;
using System.Data.SqlClient;

namespace Book_BL
{
    public class BookBL
    {
        CKMDL cKMDL;
        FileFunction ff;
        public BookBL()
        {
            cKMDL = new CKMDL();
            ff = new FileFunction();
        }

        public string Book_CUD(BookModel bookModel)
        {
            bookModel.Sqlprms = new SqlParameter[34];
            bookModel.Sqlprms[0] = new SqlParameter("@BookCD", bookModel.BookCD);
            bookModel.Sqlprms[1] = new SqlParameter("@BookName", bookModel.BookName);
            bookModel.Sqlprms[2] = new SqlParameter("@AuthorCD1", bookModel.AuthorCD1);
            bookModel.Sqlprms[3] = new SqlParameter("@AuthorCD2", bookModel.AuthorCD2);
            bookModel.Sqlprms[4] = new SqlParameter("@AuthorCD3", bookModel.AuthorCD3);
            bookModel.Sqlprms[5] = new SqlParameter("@IllustratorCD1", bookModel.IllustratorCD1);
            bookModel.Sqlprms[6] = new SqlParameter("@IllustratorCD2", bookModel.IllustratorCD2);
            bookModel.Sqlprms[7] = new SqlParameter("@IllustratorCD3", bookModel.IllustratorCD3);
            bookModel.Sqlprms[8] = new SqlParameter("@CategoryCD", bookModel.CategoryCD);
            bookModel.Sqlprms[9] = new SqlParameter("@SeriesCD", bookModel.SeriesCD);
            bookModel.Sqlprms[10] = new SqlParameter("@LanguageCD", bookModel.LanguageCD);
            bookModel.Sqlprms[11] = new SqlParameter("@PublisherCD", bookModel.PublisherCD);
            bookModel.Sqlprms[12] = new SqlParameter("@PublicationYear", bookModel.PublicationYear);
            bookModel.Sqlprms[13] = new SqlParameter("@NoOfPages", bookModel.NoOfPages);
            bookModel.Sqlprms[14] = new SqlParameter("@BookContent", bookModel.BookContent);
            bookModel.Sqlprms[15] = new SqlParameter("@FolderUrl", bookModel.FolderUrl);
            bookModel.Sqlprms[16] = new SqlParameter("@CoverImageUrl", bookModel.CoverImageUrl);
            bookModel.Sqlprms[17] = new SqlParameter("@SampleImageUrl1", bookModel.SampleImageUrl1);
            bookModel.Sqlprms[18] = new SqlParameter("@SampleImageUrl2", bookModel.SampleImageUrl2);
            bookModel.Sqlprms[19] = new SqlParameter("@SampleImageUrl3", bookModel.SampleImageUrl3);
            bookModel.Sqlprms[20] = new SqlParameter("@SampleImageUrl4", bookModel.SampleImageUrl4);
            bookModel.Sqlprms[21] = new SqlParameter("@SampleImageUrl5", bookModel.SampleImageUrl5);
            bookModel.Sqlprms[22] = new SqlParameter("@RecommandAgeFrom", bookModel.RecommandAgeFrom);
            bookModel.Sqlprms[23] = new SqlParameter("@RecommandAgeTo", bookModel.RecommandAgeTo);
            bookModel.Sqlprms[24] = new SqlParameter("@GradeFrom", bookModel.GradeFrom);
            bookModel.Sqlprms[25] = new SqlParameter("@GradeTo", bookModel.GradeTo);
            bookModel.Sqlprms[26] = new SqlParameter("@PaperSize", bookModel.PaperSize);
            bookModel.Sqlprms[27] = new SqlParameter("@BNW_White_Price", bookModel.BNW_White_Price);
            bookModel.Sqlprms[28] = new SqlParameter("@BNW_Creamy_Price", bookModel.BNW_Creamy_Price);
            bookModel.Sqlprms[29] = new SqlParameter("@Color_White_Price", bookModel.Color_White_Price);
            bookModel.Sqlprms[30] = new SqlParameter("@Color_Creamy_Price", bookModel.Color_Creamy_Price);
            bookModel.Sqlprms[31] = new SqlParameter("@DeleteFlg", bookModel.DeleteFlg);
            bookModel.Sqlprms[32] = new SqlParameter("@UpdatedBy", bookModel.UpdatedBy);
            bookModel.Sqlprms[33] = new SqlParameter("@Mode", bookModel.Mode);

            return cKMDL.InsertUpdateDeleteData("M_Book_CUD", ff.GetConnectionWithDefaultPath("TBS"), bookModel.Sqlprms);
        }

        public BookModel Book_SelectModel(BookModel bookModel)
        {
            bookModel.Sqlprms = new SqlParameter[9];
            bookModel.Sqlprms[0] = new SqlParameter("@BookCD", bookModel.BookCD);
            bookModel.Sqlprms[1] = new SqlParameter("@BookName", bookModel.BookName);
            bookModel.Sqlprms[2] = new SqlParameter("@AuthorCD", bookModel.AuthorCD);
            bookModel.Sqlprms[3] = new SqlParameter("@IllustratorCD", bookModel.IllustratorCD);
            bookModel.Sqlprms[4] = new SqlParameter("@CategoryCD", bookModel.CategoryCD);
            bookModel.Sqlprms[5] = new SqlParameter("@SeriesCD", bookModel.SeriesCD);
            bookModel.Sqlprms[6] = new SqlParameter("@PublisherCD", bookModel.PublisherCD);
            bookModel.Sqlprms[7] = new SqlParameter("@LanguageCD", bookModel.LanguageCD);
            bookModel.Sqlprms[8] = new SqlParameter("@SeriesName", bookModel.SeriesName);
            DataTable dt = cKMDL.SelectDatatable("M_Book_Select", ff.GetConnectionWithDefaultPath("TBS"), bookModel.Sqlprms);
            if (dt.Rows.Count > 0)
            {
                bookModel.BookCD = dt.Rows[0]["BookCD"].ToString();
                bookModel.BookName = dt.Rows[0]["BookName"].ToString();
                bookModel.AuthorCD1 = dt.Rows[0]["AuthorCD1"].ToString();
                bookModel.AuthorName1 = dt.Rows[0]["AuthorName1"].ToString();
                bookModel.AuthorCD2 = dt.Rows[0]["AuthorCD2"].ToString();
                bookModel.AuthorName2 = dt.Rows[0]["AuthorName2"].ToString();
                bookModel.AuthorCD3 = dt.Rows[0]["AuthorCD3"].ToString();
                bookModel.AuthorName3 = dt.Rows[0]["AuthorName3"].ToString();
                bookModel.IllustratorCD1 = dt.Rows[0]["IllustratorCD1"].ToString();
                bookModel.IllustratorName1 = dt.Rows[0]["IllustratorName1"].ToString();
                bookModel.IllustratorCD2 = dt.Rows[0]["IllustratorCD2"].ToString();
                bookModel.IllustratorName2 = dt.Rows[0]["IllustratorName2"].ToString();
                bookModel.IllustratorCD3 = dt.Rows[0]["IllustratorCD3"].ToString();
                bookModel.IllustratorName3 = dt.Rows[0]["IllustratorName3"].ToString();
                bookModel.CategoryCD = dt.Rows[0]["CategoryCD"].ToString();
                bookModel.SeriesCD = dt.Rows[0]["SeriesCD"].ToString();
                bookModel.SeriesName = dt.Rows[0]["SeriesName"].ToString();
                bookModel.LanguageCD = dt.Rows[0]["LanguageCD"].ToString();
                bookModel.PublisherCD = dt.Rows[0]["PublisherCD"].ToString();
                bookModel.PublisherName = dt.Rows[0]["PublisherName"].ToString();
                bookModel.PublicationYear = dt.Rows[0]["PublicationYear"].ToString();
                bookModel.NoOfPages = dt.Rows[0]["NoOfPages"].ToString();
                bookModel.FolderUrl = dt.Rows[0]["FolderUrl"].ToString();
                bookModel.CoverImageUrl = dt.Rows[0]["CoverImageUrl"].ToString();
                bookModel.SampleImageUrl1 = dt.Rows[0]["SampleImageUrl1"].ToString();
                bookModel.SampleImageUrl2 = dt.Rows[0]["SampleImageUrl2"].ToString();
                bookModel.SampleImageUrl3 = dt.Rows[0]["SampleImageUrl3"].ToString();
                bookModel.SampleImageUrl4 = dt.Rows[0]["SampleImageUrl4"].ToString();
                bookModel.SampleImageUrl5 = dt.Rows[0]["SampleImageUrl5"].ToString();
                bookModel.RecommandAgeFrom = dt.Rows[0]["RecommandAgeFrom"].ToString();
                bookModel.RecommandAgeTo = dt.Rows[0]["RecommandAgeTo"].ToString();
                bookModel.GradeFrom = dt.Rows[0]["GradeFrom"].ToString();
                bookModel.GradeTo = dt.Rows[0]["GradeTo"].ToString();
                bookModel.PaperSize = dt.Rows[0]["PaperSize"].ToString();
                bookModel.BNW_White_Price = dt.Rows[0]["BNW_White_Price"].ToString();
                bookModel.BNW_Creamy_Price = dt.Rows[0]["BNW_Creamy_Price"].ToString();
                bookModel.Color_White_Price = dt.Rows[0]["Color_White_Price"].ToString();
                bookModel.Color_Creamy_Price = dt.Rows[0]["Color_Creamy_Price"].ToString();
                bookModel.BookContent = dt.Rows[0]["BookContent"].ToString();
                bookModel.DeleteFlg = dt.Rows[0]["DeleteFlg"].ToString();
            }

            return bookModel;
        }

        public string Book_Select(BookModel bookModel)
        {
            bookModel.Sqlprms = new SqlParameter[9];
            bookModel.Sqlprms[0] = new SqlParameter("@BookCD", bookModel.BookCD);
            bookModel.Sqlprms[1] = new SqlParameter("@BookName", bookModel.BookName);
            bookModel.Sqlprms[2] = new SqlParameter("@AuthorCD", bookModel.AuthorCD);
            bookModel.Sqlprms[3] = new SqlParameter("@IllustratorCD", bookModel.IllustratorCD);
            bookModel.Sqlprms[4] = new SqlParameter("@CategoryCD", bookModel.CategoryCD);
            bookModel.Sqlprms[5] = new SqlParameter("@SeriesCD", bookModel.SeriesCD);
            bookModel.Sqlprms[6] = new SqlParameter("@PublisherCD", bookModel.PublisherCD);
            bookModel.Sqlprms[7] = new SqlParameter("@LanguageCD", bookModel.LanguageCD);
            bookModel.Sqlprms[8] = new SqlParameter("@SeriesName", bookModel.SeriesName);
            return cKMDL.SelectJson("M_Book_Select", ff.GetConnectionWithDefaultPath("TBS"), bookModel.Sqlprms);
        }

        public DataTable BookCounter_Select(BookModel bookModel)
        {
            bookModel.Sqlprms = new SqlParameter[0];
            return cKMDL.SelectDatatable("M_BookCounter_Select", ff.GetConnectionWithDefaultPath("TBS"), bookModel.Sqlprms);
        }
    }
}
