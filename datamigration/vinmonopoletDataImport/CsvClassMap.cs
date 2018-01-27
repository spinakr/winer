using CsvHelper.Configuration;
using domain;

namespace vinmonopoletDataImport
{
  public sealed class CsvClassMap : ClassMap<VinmonopoletWine>
  {
      public CsvClassMap()
      {
          Map( m => m.Id ).Ignore();
          Map(m => m.VinmonopoletId).Index(1);
          Map(m => m.Navn).Index(2);
          Map(m => m.Pris).Index(4).ConvertUsing(t => double.Parse(t.GetField(4).Replace(',', '.')));
          Map(m => m.Varetype).Index(6);
          Map(m => m.Produktutvalg).Index(7);
          Map(m => m.Alkohol).Index(26).ConvertUsing(t => double.Parse(t.GetField(26).Replace(',', '.')));
          Map(m => m.Land).Index(20);
          Map(m => m.Distrikt).Index(21);
          Map(m => m.Underdistrikt).Index(22);
          Map(m => m.Produsent).Index(30);
          Map(m => m.Vareurl).Index(35);
          Map(m => m.Argang).Index(23);
          Map(m => m.Rastoff).Index(24);
          Map(m => m.Metode).Index(25);
          Map(m => m.Lagringsgrad).Index(29);
          Map(m => m.Sukker).Index(27);
          Map(m => m.Syre).Index(28);
          Map(m => m.Farge).Index(14);
          Map(m => m.Lukt).Index(15);
          Map(m => m.Smak).Index(16);
          Map(m => m.Passertil1).Index(17);
          Map(m => m.Passertil2).Index(18);
          Map(m => m.Passertil3).Index(19);
          Map(m => m.Fylde).Index(9);
          Map(m => m.Friskhet).Index(10);
          Map(m => m.Garvestoffer).Index(11);
          Map(m => m.Bitterhet).Index(12);
          Map(m => m.Sodme).Index(13);
      }
  }
}