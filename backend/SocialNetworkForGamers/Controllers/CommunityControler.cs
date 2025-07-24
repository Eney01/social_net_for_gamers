using Microsoft.AspNetCore.Mvc;
using SocialNetworkForGamers.Models.DatabaseModels.Data;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;
using Microsoft.EntityFrameworkCore;
using SocialNetworkForGamers.Models.MainPageModels;
[ApiController]
[Route("api/[controller]")]
public class CommunityController : ControllerBase
{
    private readonly AppDbContext _context;

    public CommunityController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{slug}")]
    public IActionResult GetCommunityBySlug(string slug)
    {
        var community = _context.Communities
            .Include(c => c.Posts)
            .FirstOrDefault(c => c.Slug == slug);

        if (community == null)
            return NotFound();

        return Ok(community);
    }
}