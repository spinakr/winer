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

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return $"her is {id}";
        }

        public IEnumerable<Wine> GetWinesWithStatus(int status, int page, int pageCount)
        {
            using (var db = new SqlConnection(@"Server=db;Database=winer;User Id=SA; Password=Qwer1234*;"))
            {
                var wines = db.GetListPaged<Wine>(page, pageCount, $"WHERE Status={status}", "boughtDate desc");
                return wines;
            }
        }
    }
}
