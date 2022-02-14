using CKM_CommonFunction;
using CKM_DataLayer;
using TBS_Model;
using System.Data;
using System.Data.SqlClient;

namespace Promotion_BL
{
    public class PromotionBL
    {
        CKMDL cKMDL;
        FileFunction ff;
        public PromotionBL()
        {
            cKMDL = new CKMDL();
            ff = new FileFunction();
        }
        public string Promotion_CUD(PromotionModel promotionModel)
        {
            promotionModel.Sqlprms = new SqlParameter[8];
            promotionModel.Sqlprms[0] = new SqlParameter("@PromotionCD", promotionModel.PromotionCD);
            promotionModel.Sqlprms[1] = new SqlParameter("@PromotionName", promotionModel.PromotionName);
            promotionModel.Sqlprms[2] = new SqlParameter("@PromotionPercent", promotionModel.PromotionPercent);
            promotionModel.Sqlprms[3] = new SqlParameter("@PromotionType", promotionModel.PromotionType);
            promotionModel.Sqlprms[4] = new SqlParameter("@PromotionStartDate", promotionModel.PromotionStartDate);
            promotionModel.Sqlprms[5] = new SqlParameter("@PromotionEndDate", promotionModel.PromotionEndDate);
            promotionModel.Sqlprms[6] = new SqlParameter("@UpdatedBy", promotionModel.UpdatedBy);
            promotionModel.Sqlprms[7] = new SqlParameter("@Mode", promotionModel.Mode);
            return cKMDL.InsertUpdateDeleteData("M_Promotion_CUD", ff.GetConnectionWithDefaultPath("TBS"), promotionModel.Sqlprms);
        }
        public PromotionModel Promotion_SelectModel(PromotionModel PromotionModel)
        {
            PromotionModel.Sqlprms = new SqlParameter[2];
            PromotionModel.Sqlprms[0] = new SqlParameter("@PromotionCD", PromotionModel.PromotionCD);
            PromotionModel.Sqlprms[1] = new SqlParameter("@PromotionName", PromotionModel.PromotionName);
            DataTable dt = cKMDL.SelectDatatable("M_Promotion_Select", ff.GetConnectionWithDefaultPath("TBS"), PromotionModel.Sqlprms);
            if (dt.Rows.Count > 0)
            {
                PromotionModel.PromotionCD = dt.Rows[0]["PromotionCD"].ToString();
                PromotionModel.PromotionName = dt.Rows[0]["PromotionName"].ToString();
                PromotionModel.PromotionPercent = dt.Rows[0]["PromotionPercent"].ToString();
                PromotionModel.PromotionType = dt.Rows[0]["PromotionType"].ToString();
                PromotionModel.PromotionStartDate = dt.Rows[0]["PromotionStartDate"].ToString();
                PromotionModel.PromotionEndDate = dt.Rows[0]["PromotionEndDate"].ToString();
                PromotionModel.PromotionStatus = dt.Rows[0]["PromotionStatus"].ToString();
            }

            return PromotionModel;
        }
        public string Promotion_Select(PromotionModel PromotionModel)
        {
            PromotionModel.Sqlprms = new SqlParameter[2];
            PromotionModel.Sqlprms[0] = new SqlParameter("@PromotionCD", PromotionModel.PromotionCD);
            PromotionModel.Sqlprms[1] = new SqlParameter("@PromotionName", PromotionModel.PromotionName);
            return cKMDL.SelectJson("M_Promotion_Select", ff.GetConnectionWithDefaultPath("TBS"), PromotionModel.Sqlprms);
        }
    }
}
