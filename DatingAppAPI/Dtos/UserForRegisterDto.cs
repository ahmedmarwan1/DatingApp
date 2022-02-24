using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage =" you should specify a pasword from 4 to 8 character")]
        public string Password { get; set; }    
        [Required]  
        public string  Gender { get; set; }
        [Required]
        public string knownAs { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive  { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}