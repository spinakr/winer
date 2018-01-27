﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using api.Storage;
using Dapper;
using domain;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
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
            _writeRepo.SaveWine(wine);
            return Ok(wine);
        }
    }
}
