using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;

namespace SocialNetworkForGamers.Models.DatabaseModels.Data.Configuration
{
    public class ClipConfiguration : IEntityTypeConfiguration<Clip>
    {
        public void Configure(EntityTypeBuilder<Clip> builder)
        {
            builder.ToTable("Clips");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.VideoUrl)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(x => x.StreamId)
                .IsRequired();

            builder.Property(x => x.CreatorId)
                .IsRequired();

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.HasOne(x => x.Stream)
                .WithMany(u => u.Clips)
                .HasForeignKey(x => x.StreamId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Creator)
                .WithMany(u => u.Clips)
                .HasForeignKey(x => x.CreatorId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
