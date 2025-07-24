using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;

namespace SocialNetworkForGamers.Models.DatabaseModels.Data.Configuration
{
    public class UserSettingConfiguration : IEntityTypeConfiguration<UserSetting>
    {
        public void Configure(EntityTypeBuilder<UserSetting> builder)
        {
            builder.ToTable("UserSettings");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.BackgroundUrl)
                .HasMaxLength(255);

            builder.Property(x => x.UserId)
                .IsRequired(); 

            builder.Property(x => x.DarkMode)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.NotificationsEnabled)
                .IsRequired()
                .HasDefaultValue(true);

            builder.Property(x => x.Language)
                .IsRequired()
                .HasMaxLength(10);

            builder.HasOne(x => x.User)
                .WithMany(u => u.UserSettings)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
