using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;

namespace SocialNetworkForGamers.Models.DatabaseModels.Data.Configuration
{
    public class CommunityConfiguration : IEntityTypeConfiguration<Community>
    {
        public void Configure(EntityTypeBuilder<Community> builder)
        {
            builder.ToTable("Communities");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.AvatarUrl)
                .HasMaxLength(255);

            builder.Property(x => x.BunnerUrl)
                .HasMaxLength(255);

            builder.Property(x => x.CreatorId)
                .IsRequired();

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.HasOne(x => x.Creator)
                .WithMany(u => u.Communities)
                .HasForeignKey(x => x.CreatorId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
