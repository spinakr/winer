
using Dapper;

namespace domain
{
    [Table("VinmonopoletWine")]
    public class VinmonopoletWine
    {
        public int Id { get; set; }
        public string VinmonopoletId { get; set; }
        public string Navn { get; set; }
        public double Pris { get; set; }
        public string Varetype { get; set; }
        public string Produktutvalg { get; set; }
        public string Land { get; set; }
        public string Distrikt { get; set; }
        public string Underdistrikt { get; set; }
        public string Produsent { get; set; }
        public string Vareurl { get; set; }
        public string Argang { get; set; }
        public string Rastoff { get; set; }
        public string Metode { get; set; }
        public string Lagringsgrad { get; set; }
        public double Alkohol { get; set; }
        public string Sukker { get; set; }
        public string Syre { get; set; }
        public string Farge { get; set; }
        public string Lukt { get; set; }
        public string Smak { get; set; }
        public string Passertil1 { get; set; }
        public string Passertil2 { get; set; }
        public string Passertil3 { get; set; }
        public int Fylde { get; set; }
        public int Friskhet { get; set; }
        public int Garvestoffer { get; set; }
        public int Bitterhet { get; set; }
        public int Sodme { get; set; }  
    }
}
