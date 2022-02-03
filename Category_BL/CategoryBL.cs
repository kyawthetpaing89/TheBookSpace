using CKM_CommonFunction;
using CKM_DataLayer;
using TBS_Model;
using System.Data;
using System.Data.SqlClient;

namespace Category_BL
{
    public class CategoryBL
    {
        CKMDL cKMDL;
        FileFunction ff;
        public CategoryBL()
        {
            cKMDL = new CKMDL();
            ff = new FileFunction();
        }

        public string Category_CUD(CategoryModel CategoryModel)
        {
            CategoryModel.Sqlprms = new SqlParameter[5];
            CategoryModel.Sqlprms[0] = new SqlParameter("@CategoryCD", CategoryModel.CategoryCD);
            CategoryModel.Sqlprms[1] = new SqlParameter("@CategoryName", CategoryModel.CategoryName);
            CategoryModel.Sqlprms[2] = new SqlParameter("@DeleteFlg", CategoryModel.DeleteFlg);
            CategoryModel.Sqlprms[3] = new SqlParameter("@UpdatedBy", CategoryModel.UpdatedBy);
            CategoryModel.Sqlprms[4] = new SqlParameter("@Mode", CategoryModel.Mode);
            return cKMDL.InsertUpdateDeleteData("M_Category_CUD", ff.GetConnectionWithDefaultPath("TBS"), CategoryModel.Sqlprms);
        }

        public CategoryModel Category_SelectModel(CategoryModel CategoryModel)
        {
            CategoryModel.Sqlprms = new SqlParameter[2];
            CategoryModel.Sqlprms[0] = new SqlParameter("@CategoryCD", CategoryModel.CategoryCD);
            CategoryModel.Sqlprms[1] = new SqlParameter("@CategoryName", CategoryModel.CategoryName);
            DataTable dt = cKMDL.SelectDatatable("M_Category_Select", ff.GetConnectionWithDefaultPath("TBS"), CategoryModel.Sqlprms);
            if (dt.Rows.Count > 0)
            {
                CategoryModel.CategoryCD = dt.Rows[0]["CategoryCD"].ToString();
                CategoryModel.CategoryName = dt.Rows[0]["CategoryName"].ToString();
            }

            return CategoryModel;
        }

        public string Category_Select(CategoryModel CategoryModel)
        {
            CategoryModel.Sqlprms = new SqlParameter[2];
            CategoryModel.Sqlprms[0] = new SqlParameter("@CategoryCD", CategoryModel.CategoryCD);
            CategoryModel.Sqlprms[1] = new SqlParameter("@CategoryName", CategoryModel.CategoryName);
            return cKMDL.SelectJson("M_Category_Select", ff.GetConnectionWithDefaultPath("TBS"), CategoryModel.Sqlprms);
        }
    }
}
