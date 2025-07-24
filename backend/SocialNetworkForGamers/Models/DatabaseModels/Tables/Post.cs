
namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Post
    {
        public long Id { get; set; }
        public string Avatar { get; set; }
        public string Username { get; set; }
        public string Text { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? AuthorUserId { get; set; }
        public User? AuthorUser { get; set; }
        public Post? ReplyToPost { get; set; }
        public virtual List<Post> Posts { get; set; }
        public virtual List<PostTag> PostTags { get; set; }
        public virtual List<PostMedia> Media { get; set; } = new();
        public virtual List<Report> Reports { get; set; } = new();

        public int Likes { get; set; } = 0;
        public int Comments { get; set; } = 0;
        public int Views { get; set; } = 0;
        public int Shares { get; set; } = 0;
        public int Saves { get; set; } = 0;

        public Post()
        {
            CreatedAt = DateTime.Now;
            Posts = new List<Post>();
            PostTags = new List<PostTag>();
        }
    }
}
