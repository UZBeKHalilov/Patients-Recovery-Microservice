using System.ComponentModel.DataAnnotations;

namespace IdentityService.Dtos;

public class RegisterDto
{
    [Required]
    public string Username { get; set; } = null!; // Added Username

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; } = null!;

    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; } = null!;

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Role { get; set; } // Added Role
}