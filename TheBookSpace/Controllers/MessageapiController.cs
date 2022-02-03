using System.Web.Http;
using TBS_Model;
using Message_BL;

namespace TheBookSpace.Controllers
{
    public class MessageapiController : ApiController
    {
        [UserAuthentication]
        [HttpPost]
        public string GetMessage([FromBody] MessageModel Mmodel)
        {
            if (Mmodel == null)
            {
                Mmodel = new MessageModel();
            }
            MessageBL msgBL = new MessageBL();
            return msgBL.Message_Select(Mmodel);
        }
    }
}
