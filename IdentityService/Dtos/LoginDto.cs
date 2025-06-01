using System.ComponentModel.DataAnnotations;

namespace IdentityService.Dtos;

public class LoginDto
{
    [Required]
    public string Username { get; set; } = null!; // Added Username to match controller usage

    // If you intend to login with Email, ensure AuthController uses FindByEmailAsync
    // For now, keeping Email as well, but controller uses Username from error messages
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; } = null!;
}