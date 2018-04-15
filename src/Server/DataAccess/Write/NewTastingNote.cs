using System;
using Dapper;

namespace Winer.DataAccess.Write
{
    [Table("TastingNote")]
    public class TastingNote
    {
        public int Id { get; set; }
        public int WineId { get; set; }
        public string Note { get; set; }
        public string Occation { get; set; }
        public DateTime ConsumptionDate { get; set; }
        public int Score { get; set; }
    }
}

