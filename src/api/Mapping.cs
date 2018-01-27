using System;
using domain;

namespace api 
{
    public static class Mapping 
    {
        public static Wine MapToWineEntity(this VinmonopoletWine wineInfo)
        {
            return new Wine
            {
                VinmonopoletId = wineInfo.VinmonopoletId,
                Name = wineInfo.Navn,
                Status = 1,
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