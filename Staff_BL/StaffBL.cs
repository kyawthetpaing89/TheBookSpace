using CKM_CommonFunction;
using CKM_DataLayer;
using System.Data.SqlClient;
using TBS_Model;

namespace Staff_BL
{
    public class StaffBL
    {
        CKMDL cKMDL;
        FileFunction ff;
        public StaffBL()
        {
            cKMDL = new CKMDL();
            ff = new FileFunction();
        }
        public string Staff_Select(StaffModel staffModel)
        {
            staffModel.Sqlprms = new SqlParameter[2];
            staffModel.Sqlprms[0] = new SqlParameter("@StaffCD", staffModel.StaffCD);
            staffModel.Sqlprms[1] = new SqlParameter("@StaffPassword", staffModel.StaffPassword);
            return cKMDL.SelectJson("M_Staff_Select", ff.GetConnectionWithDefaultPath("TBS"), staffModel.Sqlprms);
        }
    }
}
