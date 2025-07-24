using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;

namespace SocialNetworkForGamers.Models.DatabaseModels.Data.Configuration
{
    public class ReportConfiguration : IEntityTypeConfiguration<Report>
    {
        public void Configure(EntityTypeBuilder<Report> builder)
        {
            builder.ToTable("Reports");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Reason)
                .IsRequired();

            builder.Property(x => x.StatusId)
                .IsRequired();

            builder.Property(x => x.ReporterId)
                .IsRequired();

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.HasOne(x => x.Status)
                .WithMany(u => u.Reports)
                .HasForeignKey(x => x.StatusId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Reporter)
                .WithMany(u => u.MyReports)
                .HasForeignKey(x => x.ReporterId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.ReportedUser)
                .WithMany(u => u.ReportsAgainst)
                .HasForeignKey(x => x.ReportedUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.ReportedPost)
                .WithMany(u => u.Reports)
                .HasForeignKey(x => x.ReportedPostId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
