using System.Data.SqlClient;

namespace TBS_Model
{
    public class BaseModel
    {
        public string Mode { get; set; }
        public string SPName { get; set; }
        public SqlParameter[] Sqlprms { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedDate { get; set; }
        public string DeleteFlg { get; set; }
    }
}
