using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using DatingApp.API.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/users/{userId}/[controller]")]
    public class MessagesController : Controller
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public MessagesController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet("{id}", Name ="GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messagefromRepo = await _repo.GetMessage(id);

            if(messagefromRepo == null)
                return NotFound();

            return Ok(messagefromRepo);
        }
        [HttpGet("thread/{id}")]
        public async Task<IActionResult> GetMessageThread(int userId,int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messagesfromRepo = await _repo.GetMessageThread(userId, id);

            var messageThread = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesfromRepo);

            return Ok(messageThread);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId, MessageParams messageParams)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessagesForUser(messageParams);

            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messageFromRepo);
            
            Response.AddPagination(messageFromRepo.CurrentPage, messageFromRepo.PageSize, messageFromRepo.TotalCount,messageFromRepo.TotalPages);

            return Ok(messages);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId,
                [FromBody] MessageForCreationDto messageForCreationDto)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageForCreationDto.SenderId = userId;

            var recipientId = await _repo.GetUser(messageForCreationDto.RecipientId);
            var sender = await _repo.GetUser(messageForCreationDto.SenderId);

            if(recipientId == null)
                return BadRequest("Could not find user");

            var message = _mapper.Map<Message>(messageForCreationDto);

            _repo.Add(message);

            var messageToReturn = _mapper.Map<MessageToReturnDto>(message);

            if(await _repo.SaveAll())
                return Ok(messageToReturn);
                // return CreatedAtRoute( "GetMessage" , new { id = message.Id }, message);
                
            
            throw new System.Exception("Vreating the message failed in save");
        }
    }
}