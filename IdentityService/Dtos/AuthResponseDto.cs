using System;
using System.Collections.Generic;

namespace IdentityService.Dtos;

public class AuthResponseDto
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public string Token { get; set; } = null!;
    public DateTime Expiration { get; set; }
    public string UserId { get; set; } = null!;
    public string? Username { get; set; } // Added Username
    public string Email { get; set; } = null!;
    public IList<string> Roles { get; set; } = new List<string>();
    public IEnumerable<string>? Errors { get; set; } // Added Errors
}