
using System.Data.SqlClient;

namespace Winer.DataAccess
{
    public interface IConnectionProvider
    {
        SqlConnection GetConnection();
    }

    public class ConnectionProvider : IConnectionProvider
    {
        public SqlConnection GetConnection()
        {
            return new SqlConnection(@"Server=db;Database=winer;User Id=SA; Password=Qwer1234*;");
        }
    }

}
