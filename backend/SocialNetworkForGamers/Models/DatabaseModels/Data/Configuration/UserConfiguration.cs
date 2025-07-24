using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;

namespace SocialNetworkForGamers.Models.DatabaseModels.Data.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            

            builder.HasKey(x => x.Id);


            builder.Property(x => x.AvatarUrl)
                .HasMaxLength(255);

            builder.Property(x => x.Firstname)
                .HasMaxLength(255);

            builder.Property(x => x.Lastname)
                .HasMaxLength(255);

            builder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.HasOne(x => x.Account)
                .WithMany(u => u.Users)
                .HasForeignKey(x => x.AccountId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(x => x.AccountId)
                .IsRequired();


            builder.HasIndex(x => x.Email)
                .IsUnique();


            builder.HasOne(x => x.Role)
                .WithMany(u => u.Users)
                .HasForeignKey(x => x.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.UserState)
                .WithMany(u => u.Users)
                .HasForeignKey(x => x.UserStateId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
