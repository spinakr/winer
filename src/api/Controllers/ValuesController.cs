using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/ping")]
    public class ValuesController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return "pong";
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return $"her is {id}";
        }
    }
}
