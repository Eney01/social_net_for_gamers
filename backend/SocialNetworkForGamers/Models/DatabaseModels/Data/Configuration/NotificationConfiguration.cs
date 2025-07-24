using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;

namespace SocialNetworkForGamers.Models.DatabaseModels.Data.Configuration
{
    public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.ToTable("Notifications");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.IsRead)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.TypeId)
                .IsRequired();

            builder.Property(x => x.AuthorId)
                .IsRequired();

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.HasOne(x => x.Type)
                .WithMany(u => u.Notifications)
                .HasForeignKey(x => x.TypeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Author)
                .WithMany(u => u.AuthorNotifications)
                .HasForeignKey(x => x.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.ReferenceUser)
                .WithMany(u => u.ReferenceNotifications)
                .HasForeignKey(x => x.ReferenceUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.ReferenceCommunity)
                .WithMany(u => u.Notifications)
                .HasForeignKey(x => x.ReferenceCommunityId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
