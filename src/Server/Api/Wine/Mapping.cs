using System;
using Winer.DataAccess.Read;
using Winer.DataAccess.Write;

namespace Winer.Api.Wine
{
    public static class Mapping 
    {
        public static NewWine MapToWineEntity(this DataAccess.Read.VinmonopoletWine wineInfo)
        {
            return new NewWine
            {
                VinmonopoletId = wineInfo.VinmonopoletId,
                Name = wineInfo.Navn,
                Status = 0,
                Vintage = wineInfo.Argang,
                Type = wineInfo.Varetype,
                Producer = wineInfo.Produsent,
                Country = wineInfo.Land,
                Area = wineInfo.Distrikt,
                Fruit = wineInfo.Rastoff,
                Price = wineInfo.Pris,
                BoughtDate = DateTime.Today
            };
        }
    }

}