using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;

namespace SocialNetworkForGamers.Models.DatabaseModels.Data.Configuration
{
    public class GameConfiguration : IEntityTypeConfiguration<Game>
    {
        public void Configure(EntityTypeBuilder<Game> builder)
        {
            builder.ToTable("Games");

            builder.HasKey(g => g.Id);

            builder.Property(g => g.Slug)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.HasIndex(g => g.Slug)
                   .IsUnique();

            builder.Property(g => g.Title)
                   .IsRequired()
                   .HasMaxLength(150);

            builder.Property(g => g.ReleaseDate)
                   .IsRequired();

            builder.Property(g => g.UpdatedAt)
                   .IsRequired();

            builder.Property(g => g.Developer)
                   .HasMaxLength(100);

            builder.Property(g => g.Publisher)
                   .HasMaxLength(100);

            builder.Property(g => g.AgeRating)
                   .HasMaxLength(20);

            builder.Property(g => g.Metacritic);

            builder.Property(g => g.SteamReview)
                   .HasMaxLength(100);

            builder.Property(g => g.IgnRating)
                   .HasMaxLength(20);

            builder.Property(g => g.Followers);

            builder.Property(g => g.IsOfficial);

            builder.Property(g => g.LogoUrl)
                   .HasMaxLength(500);

            builder.Property(g => g.BannerUrl)
                   .HasMaxLength(500);

            builder.Property(g => g.Icon)
                   .HasMaxLength(300);

            builder.Property(g => g.CommunityTag)
                   .HasMaxLength(100);

            //  Game → GameGenres
            builder.HasMany(g => g.Genres)
                   .WithOne(g => g.Game)
                   .HasForeignKey(gg => gg.GameId)
                   .OnDelete(DeleteBehavior.Cascade);

            //  Game → GameCategories
            builder.HasMany(g => g.Categories)
                   .WithOne(c => c.Game)
                   .HasForeignKey(gc => gc.GameId)
                   .OnDelete(DeleteBehavior.Cascade);

            //  Game → GameSections
            builder.HasMany(g => g.Sections)
                   .WithOne(s => s.Game)
                   .HasForeignKey(gs => gs.GameId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
