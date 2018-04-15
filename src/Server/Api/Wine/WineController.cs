using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Winer.DataAccess.Read;
using Winer.DataAccess.Write;

namespace Winer.Api.Wine
{
    [Route("api/wine")]
    public class WineController : Controller
    {
        public IReadRepository _readRepo;
        public IWriteRepository _writeRepo;

        public WineController(IReadRepository readRepo, IWriteRepository writeRepo)
        {
            _readRepo = readRepo;
            _writeRepo = writeRepo;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetInventory(int page = 1, int pageCount = 9)
        {
            var (wines, count) = _readRepo.GetWinesWithStatus(1, page, pageCount);
            return Ok(new {wines, count});
        }

        [HttpGet]
        [Route("archive")]
        public IActionResult GetArchive(int page = 1, int pageCount = 9)
        {
            var (wines, count) = _readRepo.GetWinesWithStatus(2, page, pageCount);
            return Ok(new {wines, count});
        }

        [HttpGet]
        [Route("shoppinglist")]
        public IActionResult GetShoppingList(int page = 1, int pageCount = 9)
        {
            var (wines, count) = _readRepo.GetWinesWithStatus(3, page, pageCount);
            return Ok(new {wines, count});
        }
        
        [HttpGet]
        [Route("{vinmonopoletId}")]
        public IActionResult SearchWine(string vinmonopoletId)
        {
            var wineInfo = _readRepo.GetVinmonopoletWine(vinmonopoletId);
            if (wineInfo is null) return NotFound("Wine not found in vinmonopolet data");
            return Ok(wineInfo.MapToWineEntity());
        }

        [HttpPost]
        [Route("{vinmonopoletId}")]
        public IActionResult AddNewWine(string vinmonopoletId)
        {
            var wineInfo = _readRepo.GetVinmonopoletWine(vinmonopoletId);
            if (wineInfo is null) return NotFound("Wine not found in vinmonopolet data");
            var wine = wineInfo.MapToWineEntity();
            wine.Status = 1;
            _writeRepo.SaveWine(wine);
            return Ok(wine);
        }
        
        [HttpPost]
        [Route("{wineId}/archive")]
        public IActionResult MoveToArchive(int wineId)
        {
            _writeRepo.MovedToArchive(wineId);
            return Ok();
        }
        
        [HttpPost]
        [Route("{wineId}/delete")]
        public IActionResult DeleteWine(int wineId)
        {
            _writeRepo.DeleteWine(wineId);
            return Ok();
        }
        
        [HttpPost]
        [Route("{wineId}/inventory")]
        public IActionResult MoveToinventory(int wineId)
        {
            _writeRepo.MovedToInventory(wineId);
            return Ok();
        }
    }
}
