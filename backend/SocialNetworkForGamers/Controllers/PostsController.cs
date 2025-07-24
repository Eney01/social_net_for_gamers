using Microsoft.AspNetCore.Mvc;
using SocialNetworkForGamers.Models.DatabaseModels.Data;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;
using Microsoft.EntityFrameworkCore;
using SocialNetworkForGamers.Models.MainPageModels;

namespace Social_network.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var posts = await _context.Posts
                .Include(p => p.Username)
                .Include(p => p.PostTags)
                .Include(p => p.Media)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            var result = posts.Select(p => new
            {
                id = p.Id,
                text = p.Text,
                dateTime = p.CreatedAt,
                username = p.Username,
                avatar = p.Avatar,
                tags = p.PostTags.Select(t => t.Tag.Name).ToList(),
                images = p.Media.Where(m => m.Type == "image").Select(m => m.Url).ToList(),
                videos = p.Media.Where(m => m.Type == "video").Select(m => m.Url).ToList(),
                stats = new { likes = 0, comments = 0, views = 0, shares = 0, saves = 0 }
            });

            return Ok(result);
        }

        // POST: api/Post
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDto postDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newPost = new Post
            {
                Text = postDto.Content,
                CreatedAt = DateTime.UtcNow,
                Id = postDto.UserId,
                Media = postDto.Media.Select(m => new PostMedia
                {
                    Url = m.Url,
                    Type = m.Type,
                    Size = m.Size
                }).ToList()
            };

            _context.Posts.Add(newPost);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post created successfully", postId = newPost.Id });
        }
    }
}
