using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using DatingApp.API.Models.Data;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using AutoMapper;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IMapper _mapepr;
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapepr = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
        {
            if(!string.IsNullOrEmpty(userForRegisterDto.Username))
                userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
                
            if(await _repo.UserExists(userForRegisterDto.Username))
                ModelState.AddModelError("Username", "Username is already token");

            //validate request
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var UserToCreate = _mapepr.Map<User>(userForRegisterDto);

            var createUser = await _repo.Register(UserToCreate, userForRegisterDto.Password);

            var usertoReturn = _mapepr.Map<UserForDetailsDto>(createUser);

            return CreatedAtRoute("GetUser", new {Controller = "User",id = createUser.Id},usertoReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]UserForRegisterDto userForRegisterDto)
        {
            //throw new Exception("computer says no");
            var userFromRepo =await _repo.Login(userForRegisterDto.Username.ToLower(), userForRegisterDto.Password);

            if(userFromRepo == null)
                return Unauthorized();

            //generate token
            var tokenhandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("super secret key");
            var toeknDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.Username)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), 
                    SecurityAlgorithms.HmacSha256Signature)
                
            };
            var token = tokenhandler.CreateToken(toeknDescriptor);
            var tokenString = tokenhandler.WriteToken(token);

            var user = _mapepr.Map<UserForListDtos>(userFromRepo);

            return Ok(new {tokenString ,user});
            
        }

    }
}