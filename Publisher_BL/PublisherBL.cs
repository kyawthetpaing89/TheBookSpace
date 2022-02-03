using CKM_CommonFunction;
using CKM_DataLayer;
using TBS_Model;
using System.Data;
using System.Data.SqlClient;

namespace Publisher_BL
{
    public class PublisherBL
    {
        CKMDL cKMDL;
        FileFunction ff;
        public PublisherBL()
        {
            cKMDL = new CKMDL();
            ff = new FileFunction();
        }

        public string Publisher_CUD(PublisherModel publisherModel)
        {
            publisherModel.Sqlprms = new SqlParameter[5];
            publisherModel.Sqlprms[0] = new SqlParameter("@PublisherCD", publisherModel.PublisherCD);
            publisherModel.Sqlprms[1] = new SqlParameter("@PublisherName", publisherModel.PublisherName);
            publisherModel.Sqlprms[2] = new SqlParameter("@DeleteFlg", publisherModel.DeleteFlg);
            publisherModel.Sqlprms[3] = new SqlParameter("@UpdatedBy", publisherModel.UpdatedBy);
            publisherModel.Sqlprms[4] = new SqlParameter("@Mode", publisherModel.Mode);
            return cKMDL.InsertUpdateDeleteData("M_Publisher_CUD", ff.GetConnectionWithDefaultPath("TBS"), publisherModel.Sqlprms);
        }

        public PublisherModel Publisher_SelectModel(PublisherModel publisherModel)
        {
            publisherModel.Sqlprms = new SqlParameter[2];
            publisherModel.Sqlprms[0] = new SqlParameter("@PublisherCD", publisherModel.PublisherCD);
            publisherModel.Sqlprms[1] = new SqlParameter("@PublisherName", publisherModel.PublisherName);
            DataTable dt = cKMDL.SelectDatatable("M_Publisher_Select", ff.GetConnectionWithDefaultPath("TBS"), publisherModel.Sqlprms);
            if (dt.Rows.Count > 0)
            {
                publisherModel.PublisherCD = dt.Rows[0]["PublisherCD"].ToString();
                publisherModel.PublisherName = dt.Rows[0]["PublisherName"].ToString();
            }

            return publisherModel;
        }

        public string Publisher_Select(PublisherModel PublisherModel)
        {
            PublisherModel.Sqlprms = new SqlParameter[2];
            PublisherModel.Sqlprms[0] = new SqlParameter("@PublisherCD", PublisherModel.PublisherCD);
            PublisherModel.Sqlprms[1] = new SqlParameter("@PublisherName", PublisherModel.PublisherName);
            return cKMDL.SelectJson("M_Publisher_Select", ff.GetConnectionWithDefaultPath("TBS"), PublisherModel.Sqlprms);
        }
    }
}
