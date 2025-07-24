namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Game
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Developer { get; set; }
        public string Publisher { get; set; }
        public string AgeRating { get; set; }
        public int Metacritic { get; set; }
        public string SteamReview { get; set; }
        public string IgnRating { get; set; }
        public int Followers { get; set; }
        public bool IsOfficial { get; set; }
        public string LogoUrl { get; set; }
        public string BannerUrl { get; set; }
        public string Icon { get; set; }
        public string CommunityTag { get; set; }

        public List<GameGenre> Genres { get; set; }
        public List<GameCategory> Categories { get; set; }
        public List<GameSection> Sections { get; set; }
    }

    public class GameGenre
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public string Genre { get; set; }

        public Game Game { get; set; } //дає можливість по навігації повернутись.
    }

    public class GameCategory
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public string Category { get; set; }

        public Game Game { get; set; }
    }

    public class GameSection
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public string SectionName { get; set; } // main, plot, info, hardware
        public string Content { get; set; }

        public Game Game { get; set; }
    }
}
