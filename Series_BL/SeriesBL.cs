using CKM_CommonFunction;
using CKM_DataLayer;
using TBS_Model;
using System.Data;
using System.Data.SqlClient;

namespace Series_BL
{
    public class SeriesBL
    {
        CKMDL cKMDL;
        FileFunction ff;
        public SeriesBL()
        {
            cKMDL = new CKMDL();
            ff = new FileFunction();
        }

        public string Series_CUD(SeriesModel seriesModel)
        {
            seriesModel.Sqlprms = new SqlParameter[5];
            seriesModel.Sqlprms[0] = new SqlParameter("@SeriesCD", seriesModel.SeriesCD);
            seriesModel.Sqlprms[1] = new SqlParameter("@SeriesName", seriesModel.SeriesName);
            seriesModel.Sqlprms[2] = new SqlParameter("@DeleteFlg", seriesModel.DeleteFlg);
            seriesModel.Sqlprms[3] = new SqlParameter("@UpdatedBy", seriesModel.UpdatedBy);
            seriesModel.Sqlprms[4] = new SqlParameter("@Mode", seriesModel.Mode);
            return cKMDL.InsertUpdateDeleteData("M_Series_CUD", ff.GetConnectionWithDefaultPath("TBS"), seriesModel.Sqlprms);
        }

        public SeriesModel Series_SelectModel(SeriesModel SeriesModel)
        {
            SeriesModel.Sqlprms = new SqlParameter[2];
            SeriesModel.Sqlprms[0] = new SqlParameter("@SeriesCD", SeriesModel.SeriesCD);
            SeriesModel.Sqlprms[1] = new SqlParameter("@SeriesName", SeriesModel.SeriesName);
            DataTable dt = cKMDL.SelectDatatable("M_Series_Select", ff.GetConnectionWithDefaultPath("TBS"), SeriesModel.Sqlprms);
            if (dt.Rows.Count > 0)
            {
                SeriesModel.SeriesCD = dt.Rows[0]["SeriesCD"].ToString();
                SeriesModel.SeriesName = dt.Rows[0]["SeriesName"].ToString();
            }

            return SeriesModel;
        }

        public string Series_Select(SeriesModel SeriesModel)
        {
            SeriesModel.Sqlprms = new SqlParameter[2];
            SeriesModel.Sqlprms[0] = new SqlParameter("@SeriesCD", SeriesModel.SeriesCD);
            SeriesModel.Sqlprms[1] = new SqlParameter("@SeriesName", SeriesModel.SeriesName);
            return cKMDL.SelectJson("M_Series_Select", ff.GetConnectionWithDefaultPath("TBS"), SeriesModel.Sqlprms);
        }
    }
}
