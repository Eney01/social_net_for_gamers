using SocialNetworkForGamers.Models;
using SocialNetworkForGamers.Models.AuthorizationModels;
using SocialNetworkForGamers.Models.AuthorizationModels.RequestModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace SocialNetworkForGamers.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : Controller
    {
        private readonly AuthorizationService _authorizationService;

        public AuthorizationController(AuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
        }


        [HttpGet("backgroundImages")]
        public ActionResult GetBackgroundImages()
            => Ok(_authorizationService.GetBackgroundImages());

        [HttpPost("registration")]
        public async Task<ActionResult> Registration([FromBody] RegistrationRequest req)
        {
            if (await _authorizationService.IsLoginTaken(req.Email))
                return Conflict("Login already exists");
            if (await _authorizationService.Registration(req.Name, req.Email, req.Password))
                return Ok();
            return BadRequest();
        }

        [HttpPost("authorization")]
        public async Task<ActionResult<string>> Authorization([FromBody] AuthorizationRequest req)
        {
            var token = await _authorizationService.Authorization(req.Email, req.Password);
            if (token == null) return BadRequest();
            return Ok(token);
        }

        [HttpGet("external-login/{provider}")]
        public IActionResult ExternalLogin([FromRoute] string provider, [FromQuery] string returnUrl = "/")
        {
            if (string.IsNullOrEmpty(provider))
                return BadRequest("Provider must be specified.");

            var redirectUrl = $"https://localhost:7123/api/authorization/external-login-callback/{provider}?returnUrl={returnUrl}";
            var props = new AuthenticationProperties
            {
                RedirectUri = redirectUrl,
                Items = { { "returnUrl", returnUrl } }
            };
            Console.WriteLine("Calling Challenge() for: " + provider);

            return Challenge(props, provider);
        }




        [HttpPost("getUserId")]
        public ActionResult GetUserId([FromBody] TokenRequest req)
        {
            var result = _authorizationService.GetUserId(req.Token);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost("passwordForgot")]
        public async Task<ActionResult> RecoverPassword([FromBody] RecoverPasswordRequest req)
        {
            var res = await _authorizationService.RecoverPassword(req.Email);
            return res ? Ok() : BadRequest();
        }

        [HttpPost("setNewPassword")]
        public async Task<ActionResult> SetNewPassword([FromBody] NewPasswordRequest req)
        {
            var res = await _authorizationService.SetNewPassword(req.Token, req.Password);
            return res ? Ok() : BadRequest();
        }
    }
}
