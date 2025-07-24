namespace SocialNetworkForGamers.Models.AuthorizationModels.RequestModels
{
    public class RegistrationRequest : AuthorizationDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
