using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    public string DisplayName { get; set; }
    public string AvatarUrl { get; set; }
}
