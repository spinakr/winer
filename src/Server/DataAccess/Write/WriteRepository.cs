using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Winer.DataAccess.Read;

namespace Winer.DataAccess.Write
{
    public interface IWriteRepository
    {
        void SaveWine(NewWine wine);
        void MovedToArchive(int id);
        void DeleteWine(int id);
        void MovedToInventory(int id);
    }

    public class WriteRepository : IWriteRepository
    {
        private IConnectionProvider _connectionProvider { get; set; }
        
        public WriteRepository(IConnectionProvider connectionProvider)
        {
            _connectionProvider = connectionProvider;
        }
        
        public void SaveWine(NewWine wine)
        {
            using (var db = _connectionProvider.GetConnection())
            {
                db.Insert(wine);
            }
        }

        public void MovedToArchive(int id)
        {
            using (var db = _connectionProvider.GetConnection())
            {
                var wine = db.Get<Wine>(id);
                wine.Status = 2;
                db.Update(wine);

                var tastingNote = new TastingNote
                {
                    WineId = wine.Id,
                    Note = "",
                    Occation = "",
                    ConsumptionDate = DateTime.Now,
                    Score = 0
                };

                db.Insert(tastingNote);
            }
        }

        public void MovedToInventory(int id)
        {
            using (var db = _connectionProvider.GetConnection())
            {
                var wine = db.Get<Wine>(id);
                wine.Status = 1;
                db.Update(wine);
            }
        }

        public void DeleteWine(int id)
        {
            using (var db = _connectionProvider.GetConnection())
            {
                var wine = db.Get<Wine>(id);
                db.Delete(wine);
            }
        }
    }
}