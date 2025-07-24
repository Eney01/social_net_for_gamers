namespace SocialNetworkForGamers.Models.AuthorizationModels.RequestModels
{ 
    public class RecoverPasswordRequest : AuthorizationDto
    {
        public string Email {  get; set; }
    }
}
