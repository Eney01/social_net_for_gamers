namespace SocialNetworkForGamers.Models.AuthorizationModels.RequestModels
{ 
    public class NewPasswordRequest : AuthorizationDto
    {
        public string Token {  get; set; }
        public string Password { get; set; }
    }
}
