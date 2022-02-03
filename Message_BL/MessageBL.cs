using CKM_CommonFunction;
using CKM_DataLayer;
using System.Data.SqlClient;
using TBS_Model;

namespace Message_BL
{
    public class MessageBL
    {
        CKMDL cKMDL;
        FileFunction ff;
        public MessageBL()
        {
            cKMDL = new CKMDL();
            ff = new FileFunction();
        }
        public string Message_Select(MessageModel messageModel)
        {
            messageModel.Sqlprms = new SqlParameter[1];
            messageModel.Sqlprms[0] = new SqlParameter("@MessageID", messageModel.MessageID);
            return cKMDL.SelectJson("M_Message_Select", ff.GetConnectionWithDefaultPath("TBS"), messageModel.Sqlprms);
        }
    }
}
