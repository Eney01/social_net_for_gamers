using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;

namespace SocialNetworkForGamers.Models.DatabaseModels.Data.Configuration
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.ToTable("Posts");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Avatar)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(x => x.Username)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Text)
                .IsRequired();

            builder.Property(x => x.ImageUrl)
                .HasMaxLength(500);

            builder.Property(x => x.CreatedAt)
                .IsRequired()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.Property(x => x.Likes).HasDefaultValue(0);
            builder.Property(x => x.Comments).HasDefaultValue(0);
            builder.Property(x => x.Views).HasDefaultValue(0);
            builder.Property(x => x.Shares).HasDefaultValue(0);
            builder.Property(x => x.Saves).HasDefaultValue(0);


            builder.HasOne(x => x.ReplyToPost)
                .WithMany(x => x.Posts)
                .HasForeignKey("ReplyToPostId")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.Media)
                .WithOne(m => m.Post)
                .HasForeignKey(m => m.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.PostTags)
                .WithOne()
                .HasForeignKey("PostId")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
