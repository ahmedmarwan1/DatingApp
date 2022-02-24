using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using DatingApp.API.Models.Data;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForDetailsDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.isMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });;
              
            CreateMap<User, UserForListDtos>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.isMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap<Photo, PhotoForDetailsDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => 
                    opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.isMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => 
                    opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(u => u.isMain).Url));
                
        }
    }
}