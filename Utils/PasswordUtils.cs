using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace App.Utils
{
  public class PasswordUtils
  {
    public static byte[] GeneratePasswordSalt()
    {
      byte[] salt = new byte[16];
      using (var rng = RandomNumberGenerator.Create())
      {
        rng.GetBytes(salt);
      }
      return salt;
    }

    public static byte[] ComputePasswordHash(string password, byte[] salt)
    {
      using (var sha256 = SHA256.Create())
      {
        byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
        byte[] passwordWithSaltBytes = new byte[passwordBytes.Length + salt.Length];

        for (int i = 0; i < passwordBytes.Length; i++)
        {
          passwordWithSaltBytes[i] = passwordBytes[i];
        }
        for (int i = 0; i < salt.Length; i++)
        {
          passwordWithSaltBytes[passwordBytes.Length + i] = salt[i];
        }

        return sha256.ComputeHash(passwordWithSaltBytes);
      }
    }
  }
}