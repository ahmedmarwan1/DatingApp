//using Newtonsoft.json;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace DatingApp.API.Models.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {
            //remove all old users in database
            _context.Users.RemoveRange(_context.Users);
            _context.SaveChanges();

            //seed users
            var userData = System.IO.File.ReadAllText("C:/Demo/DatingApp/DatingApp.API/Models/Data/USerSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach(var user in users)
            {
                //create password hash
                byte[] passwordHash, passwordSalt;
                createPasswordHash("password",out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Username = user.Username.ToLower();

                _context.Users.Add(user);
            }
            _context.SaveChanges();
        }
        private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using( var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }     
    }
}