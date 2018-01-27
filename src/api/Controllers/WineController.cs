using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using domain;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/wine")]
    public class WineController : Controller
    {
        [HttpGet]
        [Route("")]
        public IActionResult GetInventory(int page = 1, int pageCount = 9)
        {
            return Ok(GetWinesWithStatus(1, page, pageCount));
        }

        [HttpGet]
        [Route("archive")]
        public IActionResult GetArchive(int page = 1, int pageCount = 9)
        {
            return Ok(GetWinesWithStatus(2, page, pageCount));
        }

        [HttpGet]
        [Route("shoppinglist")]
        public IActionResult GetShoppingList(int page = 1, int pageCount = 9)
        {
            return Ok(GetWinesWithStatus(3, page, pageCount));
        }
        
        [HttpGet]
        [Route("{vinmonopoletId}")]
        public IActionResult SearchWine(string vinmonopoletId)
        {
            var wineInfo = GetVinmonopoletWine(vinmonopoletId);

            if (wineInfo is null)
            {
                return NotFound("Wine not found in vinmonopolet data");
            }
            return Ok(MapWineInfoToWine(wineInfo));
        }
        [HttpPost]
        [Route("{vinmonopoletId}")]
        public IActionResult AddNewWine(string vinmonopoletId)
        {
            Console.WriteLine("ADD WINE: " + vinmonopoletId);
            var wineInfo = GetVinmonopoletWine(vinmonopoletId);

            if (wineInfo is null)
            {
                return NotFound("Wine not found in vinmonopolet data");
            }

            var wine = MapWineInfoToWine(wineInfo);
            SaveWine(wine);
            return Ok(wine);
        }
        
        public void SaveWine(Wine wine)
        {
            using (var db = new SqlConnection(@"Server=db;Database=winer;User Id=SA; Password=Qwer1234*;"))
            {
                db.Insert(wine);
            }
        }

        public VinmonopoletWine GetVinmonopoletWine(string vinmonopoletId)
        {
            using (var db = new SqlConnection(@"Server=db;Database=winer;User Id=SA; Password=Qwer1234*;"))
            {
                var wineInfo = db.GetList<VinmonopoletWine>(
                    "WHERE VinmonopoletId = @VinmonopoletId",
                    new { VinmonopoletId = vinmonopoletId }).FirstOrDefault();

                return wineInfo;
            }
        }

        public Wine MapWineInfoToWine(VinmonopoletWine wineInfo)
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

        public dynamic GetWinesWithStatus(int status, int page, int pageCount)
        {
            using (var db = new SqlConnection(@"Server=db;Database=winer;User Id=SA; Password=Qwer1234*;"))
            {
                var wines = db.GetListPaged<Wine>(page, pageCount, $"WHERE Status={status}", "boughtDate desc");
                var count = db.RecordCount<Wine>($"WHERE Status={status}");

                return new
                {
                    wines,
                    count
                };
            }
        }

        public class AddWineRequest
        {
            public string VinmonopoletId { get; set; }
        }
    }
}
