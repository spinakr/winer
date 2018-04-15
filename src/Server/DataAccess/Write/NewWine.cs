using System;
using Dapper;

namespace Winer.DataAccess.Write
{
    [Table("Wine")]
    public class NewWine
    {
        public int Id { get; set; }
        public string VinmonopoletId { get; set; }
        public string VinmonopoletUrl { get; set; }
        public int Status { get; set; }
        public string Name { get; set; }
        public string Vintage { get; set; }
        public string Type { get; set; }
        public string Producer { get; set; }
        public string Country { get; set; }
        public string Area { get; set; }
        public string Fruit { get; set; }
        public double Price { get; set; }
        public bool Storage { get; set; }
        public DateTime? BoughtDate { get; set; }
    }
}
