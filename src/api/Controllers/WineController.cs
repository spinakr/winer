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
        public IActionResult Get(int page = 1, int pageCount = 9)
        {

            using (var db = new SqlConnection(@"Server=db;Database=winer;User Id=SA; Password=Qwer1234*;"))
            {
                var wines = db.GetListPaged<Wine>(page, pageCount, "WHERE Status=1", "boughtDate desc");

                return Ok(wines);
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return $"her is {id}";
        }
    }
}
