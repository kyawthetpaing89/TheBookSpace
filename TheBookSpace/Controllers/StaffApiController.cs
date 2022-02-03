using System.Web.Http;
using TBS_Model;
using Staff_BL;

namespace TheBookSpace.Controllers
{
    public class StaffApiController : ApiController
    {
        [UserAuthentication]
        [HttpPost]
        public string GetStaff([FromBody] StaffModel staffModel)
        {
            if (staffModel == null)
            {
                staffModel = new StaffModel();
            }

            StaffBL staffBL = new StaffBL();
            return staffBL.Staff_Select(staffModel);
        }
    }
}
