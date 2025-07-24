namespace SocialNetworkForGamers.Models.AuthorizationModels.RequestModels
{
    public class AuthorizationRequest : AuthorizationDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
