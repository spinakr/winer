using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using domain;

namespace api.Storage
{
    public interface IReadRepository
    {
        (IEnumerable<Wine>, int) GetWinesWithStatus(int status, int page, int pageCount);
        VinmonopoletWine GetVinmonopoletWine(string vinmonopoletId);
    }

    public class ReadRepository : IReadRepository
    {
        private IConnectionProvider _connectionProvider { get; set; }
        
        public ReadRepository(IConnectionProvider connectionProvider)
        {
            _connectionProvider = connectionProvider;
        }
        
        public VinmonopoletWine GetVinmonopoletWine(string vinmonopoletId)
        {
            using (var db = _connectionProvider.GetConnection())
            {
                return db.GetList<VinmonopoletWine>(
                    "WHERE VinmonopoletId = @VinmonopoletId",
                    new { VinmonopoletId = vinmonopoletId }).FirstOrDefault();
            }
        }
        
        public (IEnumerable<Wine>, int) GetWinesWithStatus(int status, int page, int pageCount)
        {
            using (var db = _connectionProvider.GetConnection())
            {
                var wines = db.GetListPaged<Wine>(page, pageCount, $"WHERE Status={status}", "boughtDate desc");
                var count = db.RecordCount<Wine>($"WHERE Status={status}");

                return (wines, count);
            }
        }
    }
}