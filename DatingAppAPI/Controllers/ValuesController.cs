using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class ValuesController :Controller
    {
        private readonly DataContext _context;

        public ValuesController (DataContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await  _context.values.ToListAsync();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Getvalue(int id)
        {
            var value = await _context.values.FirstOrDefaultAsync(x=>x.Id == id);
            return Ok(value);
        }

    }
}