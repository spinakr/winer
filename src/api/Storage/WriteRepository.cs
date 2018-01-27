using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using domain;

namespace api.Storage
{
    public interface IWriteRepository
    {
        void SaveWine(Wine wine);
        void MovedToArchive(int id);
        void MovedToInventory(int id);
    }

    public class WriteRepository : IWriteRepository
    {
        private IConnectionProvider _connectionProvider { get; set; }
        
        public WriteRepository(IConnectionProvider connectionProvider)
        {
            _connectionProvider = connectionProvider;
        }
        
        public void SaveWine(Wine wine)
        {
            using (var db = _connectionProvider.GetConnection())
            {
                db.Insert(wine);
            }
        }

        public void MovedToArchive(int id)
        {
            UpdateStatus(id, 2);
        }

        public void MovedToInventory(int id)
        {
            UpdateStatus(id, 1);
        }

        public void UpdateStatus(int id, int newStatus)
        {
            using (var db = _connectionProvider.GetConnection())
            {
                var wine = db.Get<Wine>(id);
                wine.Status = newStatus;
                db.Update(wine);
            }
        }
    }
}