using System;

namespace App.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Login { get; set; }
        public string Password { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public DateTimeOffset Registered { get; set; }

        public string Role { get; set; }

        public User()
        {
            Login = string.Empty;
            Password = string.Empty;
            PasswordHash = new byte[0];
            PasswordSalt = new byte[0];
            Role = string.Empty;
        }
    }
}