using CKM_CommonFunction;
using CKM_DataLayer;
using TBS_Model;
using System.Data;
using System.Data.SqlClient;

namespace Author_BL
{
    public class AuthorBL
    {
        CKMDL cKMDL;
        FileFunction ff;
        public AuthorBL()
        {
            cKMDL = new CKMDL();
            ff = new FileFunction();
        }
        public string Author_CUD(AuthorModel authorModel)
        {
            authorModel.Sqlprms = new SqlParameter[7];
            authorModel.Sqlprms[0] = new SqlParameter("@AuthorCD", authorModel.AuthorCD);
            authorModel.Sqlprms[1] = new SqlParameter("@AuthorName", authorModel.AuthorName);
            authorModel.Sqlprms[2] = new SqlParameter("@Type", authorModel.Type);
            authorModel.Sqlprms[3] = new SqlParameter("@AboutAuthor", authorModel.AboutAuthor);
            authorModel.Sqlprms[4] = new SqlParameter("@DeleteFlg", authorModel.DeleteFlg);
            authorModel.Sqlprms[5] = new SqlParameter("@UpdatedBy", authorModel.UpdatedBy);
            authorModel.Sqlprms[6] = new SqlParameter("@Mode", authorModel.Mode);
            return cKMDL.InsertUpdateDeleteData("M_Author_CUD", ff.GetConnectionWithDefaultPath("TBS"), authorModel.Sqlprms);
        }
        public AuthorModel Author_SelectModel(AuthorModel authorModel)
        {
            authorModel.Sqlprms = new SqlParameter[3];
            authorModel.Sqlprms[0] = new SqlParameter("@AuthorCD", authorModel.AuthorCD);
            authorModel.Sqlprms[1] = new SqlParameter("@AuthorName", authorModel.AuthorName);
            authorModel.Sqlprms[2] = new SqlParameter("@Type", authorModel.Type);
            DataTable dt = cKMDL.SelectDatatable("M_Author_Select", ff.GetConnectionWithDefaultPath("TBS"), authorModel.Sqlprms);
            if (dt.Rows.Count > 0)
            {
                authorModel.AuthorCD = dt.Rows[0]["AuthorCD"].ToString();
                authorModel.AuthorName = dt.Rows[0]["AuthorName"].ToString();
                authorModel.Type = dt.Rows[0]["Type"].ToString();
                authorModel.AboutAuthor = dt.Rows[0]["AboutAuthor"].ToString();
            }

            return authorModel;
        }
        public string Author_Select(AuthorModel authorModel)
        {
            authorModel.Sqlprms = new SqlParameter[3];
            authorModel.Sqlprms[0] = new SqlParameter("@AuthorCD", authorModel.AuthorCD);
            authorModel.Sqlprms[1] = new SqlParameter("@AuthorName", authorModel.AuthorName);
            authorModel.Sqlprms[2] = new SqlParameter("@Type", authorModel.Type);
            return cKMDL.SelectJson("M_Author_Select", ff.GetConnectionWithDefaultPath("TBS"), authorModel.Sqlprms);
        }
    }
}
