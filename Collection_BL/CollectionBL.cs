using CKM_CommonFunction;
using CKM_DataLayer;
using TBS_Model;
using System.Data;
using System.Data.SqlClient;

namespace Collection_BL
{
    public class CollectionBL
    {
        CKMDL cKMDL;
        FileFunction ff;
        public CollectionBL()
        {
            cKMDL = new CKMDL();
            ff = new FileFunction();
        }

        public string Collection_Select(CollectionModel collectionModel)
        {
            collectionModel.Sqlprms = new SqlParameter[2];
            collectionModel.Sqlprms[0] = new SqlParameter("@CollectionType", collectionModel.CollectionType);
            collectionModel.Sqlprms[1] = new SqlParameter("@RowCount", collectionModel.RowCount);
            return cKMDL.SelectJson("T_Collection_Select", ff.GetConnectionWithDefaultPath("TBS"), collectionModel.Sqlprms);
        }
        public string Collection_CUD(CollectionModel collectionModel)
        {
            collectionModel.Sqlprms = new SqlParameter[4];
            collectionModel.Sqlprms[0] = new SqlParameter("@BookJson", collectionModel.BookJson);
            collectionModel.Sqlprms[1] = new SqlParameter("@BookCD", collectionModel.BookCD);
            collectionModel.Sqlprms[2] = new SqlParameter("@CollectionType", collectionModel.CollectionType);
            collectionModel.Sqlprms[3] = new SqlParameter("@Mode", collectionModel.Mode);
            return cKMDL.InsertUpdateDeleteData("T_Collection_CUD", ff.GetConnectionWithDefaultPath("TBS"), collectionModel.Sqlprms);
        }
    }
}
